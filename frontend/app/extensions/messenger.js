import { ElementFactory, html, defineValue } from "jolt-ui"

async function messengerMarkup(){
    return ""
}

/**
 * Creates info modal window
 * @param {Object} configs
 * @param {string} configs.title
 * @param {string} configs.content
 * @param {string} configs.modalId
 * @param {Object<string, boolean|string>} configs.modalOptions
 * @returns {string}
 */
function infoModalMarkup({ title, content, modalId, modalOptions }){
    return html`
    <div class="modal" data-modal-id="${modalId}" tabindex="-1">
        <div class="modal-dialog ${modalOptions?.size || ''}">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="btn-close" aria-label="Close" 
                    jolt-click="closeModal" :modalid="${modalId}"></button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" 
                    jolt-click="closeModal" :modalid="${modalId}">Close</button>
                </div>
            </div>
        </div>
    </div>
    `
}

/**
 * Creates confirm modal window
 * @param {Object} configs
 * @param {string} configs.title
 * @param {string} configs.content
 * @param {string} configs.modalId
 * @param {Object<string, boolean|string>} configs.modalOptions
 * @returns {string}
 */
function confirmModalMarkup({ title, content, modalId, modalOptions }){
    return html`
    <div class="modal" data-modal-id="${modalId}" tabindex="-1">
        <div class="modal-dialog ${modalOptions?.size || ''}">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="btn-close" aria-label="Close" 
                    jolt-click="closeModal" :modalid="${modalId}"></button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary me-1" 
                    jolt-click="closeModal" :modalid="${modalId}">Close</button>
                    <button type="button" class="btn btn-primary confirm-button-${modalId}" 
                    :modalid="${modalId}">Ok</button>
                </div>
            </div>
        </div>
    </div>`
}

/**
 * Creates a message markup
 * @param {Object} configs
 * @param {string} configs.msg
 * @param {string} configs.status
 * @param {string} configs.msgId
 * @returns {string}
 */
async function msgMarkup({ msg, status, msgId }){
    return html`
        <div class="toast toast-${msgId} show bg-${status}" role="alert" aria-live="assertive"
            aria-atomic="true" data-bs-autohide="true">
            <div class="toast-header bg-transparent">
                <button type="button" class="btn-close btn-close-white" jolt-click="removeToast" :msgid="${msgId}" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${msg}
            </div>
        </div>
    `
}

async function removeToast(elem, event, args){
    const toast = this.querySelector(`.toast-${args.msgid}`);
    if(!toast){
        return;
    }
    toast.remove();
}

/**
 * Creates a message markup
 * @param {Object} configs
 * @param {string} configs.msg
 * @param {string} [configs.status]
 * @returns {string}
 */
async function setMessage({ msg, status = "info"}){
    const msgId = this.app.generateHash(6);
    const markup = await this.msgMarkup({ msg, status, msgId })
    this.insertAdjacentHTML("beforeend", markup);
    setTimeout(() => {
        this.removeToast(null, null, {msgid: msgId})
    }, 6000)
}

/**
 * Creates info modal
 * @param {Object} configs
 * @param {string} configs.title
 * @param {string} configs.content 
 * @param {Object<string, boolean>} [configs.modalOptions]
 */
async function infoModal({ title, content, modalOptions }){
    const modalId = `modal-${this.app.generateHash(6)}`;
    this.insertAdjacentHTML("beforeend", await this.infoModalMarkup({title, content, modalId, modalOptions}));
    return await this.initModal(modalId, modalOptions);
}

/**
 * Creates info modal
 * @param {Object} configs
 * @param {string} configs.title
 * @param {string} configs.content 
 * @param {CallableFunction} configs.callbackFunction
 * @param {Object<string, boolean>} [configs.modalOptions]
 */
async function confirmModal({ title, content, callbackFunction, modalOptions }){
    const modalId = `modal-${this.app.generateHash(6)}`;
    this.insertAdjacentHTML("beforeend", await this.confirmModalMarkup({title, content, modalId, modalOptions}));
    const modal = await this.initModal(modalId, modalOptions);
    const confirmBtn = this.querySelector(`.confirm-button-${modalId}`);
    confirmBtn.addEventListener("click", async (event) => {
        modal.hide();
        await callbackFunction(event, modal);
        await this.closeModal(event.target);
    })
    return modal;
}

/**
 * Initilizes modal
 * @param {string} modalId 
 * @param {Object<string, boolean>} options
 * @returns {Promise<bootstrap.Modal>}
 */
async function initModal(modalId, options){
    let modalOptions = {...this.defaultOptions};
    if(options){
        modalOptions = {...modalOptions, ...options}
    }
    const modalElement = this.querySelector(`[data-modal-id="${modalId}"]`);
    const modal = new bootstrap.Modal(modalElement, modalOptions);
    this.modals.push(modal);
    modal.show();
    return modal;
}

async function closeModal(elem, event, args){
    elem.blur()
    const modal = elem.closest(".modal");
    if(!modal){
        return;
    }
    const modalId = modal.getAttribute("data-modal-id");
    const currentModal = bootstrap.Modal.getInstance(modal);
    // this.modals = this.modals.filter((mod) => {
    //     console.log(mod)
    // })
    currentModal.hide();
    modal.remove();
}

const messengerElement = ElementFactory({
    tagName: "messenger-element",
    markup: messengerMarkup,
    methods: {
        closeModal,
        infoModal,
        infoModalMarkup,
        initModal,
        confirmModal,
        confirmModalMarkup,
        msgMarkup,
        setMessage,
        removeToast
    },
    define: {
        defaultOptions: defineValue({
            backdrop: true,
            focus: true,
            keyboard: true
        }),
        modals: defineValue([])
    }
})

class MessengerExt{

    constructor(application){
        this.app = application
    }

    get messengerElement(){
        return this.app.querySelector("messenger-element")
    }

    /**
     * Creates info modal with provided title and content
     * @param {Object} configs
     * @param {string} configs.title
     * @param {string} configs.content
     * @param {Object<string, boolean|string>} [configs.modalOptions]
     * @returns {Promise<bootstrap.Modal>}
     */
    infoModal = async ({title, content, modalOptions}) => {
        return await this.messengerElement.infoModal({
            title, content, modalOptions
        })
    }

    /**
     * Creates confirm modal with provided title, content and callback function
     * @param {Object} configs
     * @param {string} configs.title
     * @param {string} configs.content
     * @param {CallableFunction} configs.callbackFunction
     * @param {Object<string, boolean|string>} [configs.modalOptions]
     * @returns {Promise<bootstrap.Modal>}
     */
    confirmModal = async ({title, content, callbackFunction, modalOptions}) => {
        return await this.messengerElement.confirmModal({
            title, content, callbackFunction, modalOptions
        })
    }

    /**
     * Creates a short message
     * @param {Object} configs
     * @param {string} configs.msg
     * @param {string} [configs.status]
     */
    setMessage = async ({ msg, status = "info" }) => {
        return await this.messengerElement.setMessage({
            msg,
            status
        })
    }
}

export {
    messengerElement,
    MessengerExt
}
