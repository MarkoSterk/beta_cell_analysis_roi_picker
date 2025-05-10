import { ElementFactory, html, querySelector } from "jolt-ui";
import { startOverlaySpinner, removeOverlaySpinner } from "../utilities/spinner";

async function uploadDropZoneMarkup(){
    return html`
        <div class="row mt-5">
            <div class="col-8 mx-auto mt-5 border rounded text-center dropzone p-3" 
            jolt-dragenter="dragEnterHandler" jolt-dragover="dragOverHandler"
            jolt-dragleave="dragLeaveHandler" jolt-drop="dropHandler" jolt-click="uploadLif" 
            style="border-color: #aaa;" role="button">
                <h2 class="text-center">Drop LIF file here or click</h2>
            </div>
            <input type="file" jolt-change="uploadFile" accept=".lif" hidden>
        </div>
    `
}

async function dragEnterHandler(elem, event, args){
    event.preventDefault();
    event.stopPropagation();
}

// Highlight dropzone when item is dragged over
async function dragOverHandler(elem, event, args){
    event.preventDefault();
    event.stopPropagation();
    this.dropzone.style.borderColor = 'blue';
    this.dropzone.classList.add("bg-secondary");
}
  
// Remove highlight when leaving
async function dragLeaveHandler(elem, event, args){
    event.preventDefault();
    event.stopPropagation();
    this.dropzone.style.borderColor = '#aaa';
    this.dropzone.classList.remove("bg-secondary");
}

async function dropHandler(elem, event, args){
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files; // FileList object
    this.handleFile(files[0]);
    this.dropzone.style.borderColor = '#aaa'; // Reset border color
    this.dropzone.classList.remove("bg-secondary");
}
  
// Helper function to process files
export async function handleFile(file) {
    startOverlaySpinner()
    const payload = new FormData();
    payload.append("file", file);
    let response = await fetch("/api/v1/files", {
        method: "POST",
        body: payload,
    });
    const status = response.status;
    try{
        response = await response.json();
        this.setData("video", response.data);
    }catch{
        this.ext.messenger.setMessage({
            msg: "Failed to parse LIF file.",
            status: "warning"
        })
    }
    removeOverlaySpinner();
}

async function uploadLif(){
    this.fileInput.click();
}

async function uploadFile(elem, event, args){
    const file = elem.files[0];
    await this.handleFile(file);
}

const uploadDropZone = ElementFactory({
    tagName: "upload-dropzone",
    markup: uploadDropZoneMarkup,
    methods: {
        uploadLif,
        handleFile,
        dropHandler,
        dragEnterHandler,
        dragOverHandler,
        dragLeaveHandler,
        uploadFile,
        startOverlaySpinner,
        removeOverlaySpinner
    },
    define: {
        dropzone: querySelector(".dropzone"),
        fileInput: querySelector('input[type="file"]')
    }
})

export default uploadDropZone
