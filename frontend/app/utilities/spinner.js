import { html } from "jolt-ui";


export function simpleSpinner(){
    return html`
    <div class="spinner-overlay simple-spinner">
        <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `
}

export function overlaySpinner(){
    return html`
    <div
        id="spinner-overlay"
        class="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
        style="z-index: 2050;"
    >
        <div class="spinner-border text-light" role="status" style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `
}

export function startSimpleSpinner(){
    const markup = simpleSpinner();
    this.insertAdjacentHTML("afterbegin", markup);
}

export function removeSimpleSpinner(){
    const spinner = this.querySelector(".simple-spinner");
    spinner.remove();
}

export function startOverlaySpinner(){
    const markup = overlaySpinner();
    document.body.insertAdjacentHTML("afterbegin", markup);
}

export function removeOverlaySpinner(){
    const spinner = document.querySelector("#spinner-overlay");
    spinner.remove();
}