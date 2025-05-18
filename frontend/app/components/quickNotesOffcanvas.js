import { defineValue, ElementFactory, html, querySelector, RequestMaker } from "jolt-ui";
import EditorJS from '@editorjs/editorjs';
import Header from "@editorjs/header";

async function quickNotesOffcanvasMarkup(){
    return html`
    <div class="offcanvas offcanvas-end w-75" data-bs-backdrop="false" data-bs-scroll="true" tabindex="-1" id="quickNotes" aria-labelledby="analysisConfigsLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="quickNotesLabel">Quick notes</h5>
            <div class="d-flex gap-2 ms-auto">
                <a role="button" jolt-click="closeOffcanvas" :next="native_export_quicknotes" title="Export pdf" class="btn text-reset"><i class="fas fa-save"></i></a>
                <button jolt-click="saveNotes" type="button" class="btn text-reset" title="Save and close" data-bs-dismiss="offcanvas" aria-label="Close">
                    <i class="fa-solid fa-check"></i>
                </button>
            </div>
        </div>
        <div class="offcanvas-body">
            <div id="quickNotesEditor">
                
            </div>
        </div>
    </div> 
    `
}

async function saveNotes(elem, event, args){
    const editorData = await this.editor.save();
    const [error, response] = await RequestMaker.post({
        url: `${this.properties.apiUrl}/quicknotes`,
        data: editorData
    })
    if(error || !response.ok){
        this.ext.messenger.setMessage({msg: "Failed to save msg", status: "warning"})
    }
}

async function closeOffcanvas(elem, event, args){
    elem.blur();
    this.offcanvasInstance.hide();
    event.preventDefault();
    const response = await window.pywebview.api[args.next]();
    if(response.status == "aborted"){
        return;
    }
    this.ext.messenger.setMessage({
        msg: response.message,
        status: response.status
    })
}

const quickNotesOffcanvas = ElementFactory({
    tagName: "quick-notes-offcanvas",
    markup: quickNotesOffcanvasMarkup,
    methods: {
        saveNotes,
        closeOffcanvas
    },
    afterInit: {
        editorInit: function(){
            this.editor = new EditorJS({
                autofocus: true,
                holder: "quickNotesEditor",
                tools: { 
                    header: {
                      class: Header, 
                      inlineToolbar: ['link'] 
                    }, 
                },
                data: this.data
            })
        }
    },
    define: {
        editor: defineValue(null),
        data: {
            get(){
                return this.getData("quicknotes") 
            }
        },
        offcanvasEl: querySelector("#quickNotes"),
        offcanvasInstance: {
            get(){
                return bootstrap.Offcanvas.getInstance(this.offcanvasEl);
            }
        }
    }
});

export default quickNotesOffcanvas;

//const editor = new EditorJS();