import { defineValue, ElementFactory, html, querySelector, RequestMaker } from "jolt-ui";
import { startOverlaySpinner, removeOverlaySpinner, setOverlaySpinnerMessage, setOverlaySpinnerPerc } from "../utilities/spinner";

async function uploadDropZoneMarkup(){
    return html`
        <div class="row mt-5">
            <div class="col-8 mx-auto mt-5 border rounded text-center dropzone p-3" 
            jolt-click="handleFile" 
            style="border-color: #aaa;" role="button">
                <h2 class="text-center">Click here to select LIF file</h2>
            </div>
        </div>
    `
}
  
// Helper function to process files
export async function handleFile() {
    startOverlaySpinner()
    const response = await window.pywebview.api.native_upload_lif_file();
    if(response.status == 'aborted'){
        removeOverlaySpinner();
        return;
    }
    await this.checkProgress(response.data)
    this.checkId = setInterval(async () => {
        await this.checkProgress(response.data)
    }, this.checkDelay)
}

export function handleFailedProgressCheck(){
    clearInterval(this.checkId);
    removeOverlaySpinner();
    return this.ext.messenger.setMessage({
        message: "Failed to process LIF",
        status: "danger"
    })
}

export async function checkProgress(checkUrl){
    let [error, response] = await RequestMaker.get({url: checkUrl});
    if(error){
        return this.handleFailedProgressCheck();
    }
    [error, response] = await response.json();
    if(error){
        return this.handleFailedProgressCheck();
    }
    if(!response?.data?.alive){
        return this.handleFailedProgressCheck();
    }
    setOverlaySpinnerMessage(response.data.message);
    setOverlaySpinnerPerc(`${response.data.perc}%`);
    if(response?.data?.status == "finished" && response?.data?.finished){
        clearInterval(this.checkId);
        this.setData("video", response.data.video);
        this.setData("preferences", response.data.preferences);
        removeOverlaySpinner();
    }
}

const uploadDropZone = ElementFactory({
    tagName: "upload-dropzone",
    markup: uploadDropZoneMarkup,
    methods: {
        handleFile,
        startOverlaySpinner,
        removeOverlaySpinner,
        checkProgress,
        handleFailedProgressCheck
    },
    define: {
        dropzone: querySelector(".dropzone"),
        fileInput: querySelector('input[type="file"]'),
        checkId: defineValue(null),
        checkDelay: defineValue(3000),
        preferencesOffcanvas: {
            get(){
                return this.app.querySelector("configurations-offcanvas");
            }
        }
    }
})

export default uploadDropZone
