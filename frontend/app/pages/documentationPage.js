import { ElementFactory, html } from "jolt-ui";

async function documentationPageMarkup(){
    return html`
        <div>
            <a href="/app" class="text-reset btn btn-sm"><i class="fas fa-arrow-left"></i> Go back</a>
        </div>
        <div class="container my-5">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active text-reset" id="basic-tab" data-bs-toggle="tab" 
                    data-bs-target="#basic" type="button" role="tab" aria-controls="basic" aria-selected="true">Basic usage</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-reset" id="issues-tab" data-bs-toggle="tab" 
                    data-bs-target="#issues" type="button" role="tab" aria-controls="issues" aria-selected="false">Known issues</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-reset" id="contact-tab" data-bs-toggle="tab" 
                    data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Author and Contact</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-reset" id="citation-tab" data-bs-toggle="tab" 
                    data-bs-target="#citation" type="button" role="tab" aria-controls="citation" aria-selected="false">Citation</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-reset" id="license-tab" data-bs-toggle="tab" 
                    data-bs-target="#license" type="button" role="tab" aria-controls="license" aria-selected="false">License</button>
                </li>
            </ul>

            <div class="tab-content mt-3" id="myTabContent">
                <div class="tab-pane fade show active" id="basic" role="tabpanel" aria-labelledby="basic-tab">
                    <basic-usage-tab></basic-usage-tab>
                </div>
                <div class="tab-pane fade" id="issues" role="tabpanel" aria-labelledby="issues-tab">
                    <issues-tab></issues-tab>
                </div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <contact-tab></contact-tab>
                </div>
                <div class="tab-pane fade" id="citation" role="tabpanel" aria-labelledby="citation-tab">
                    <citation-tab></citation-tab>
                </div>
                <div class="tab-pane fade" id="license" role="tabpanel" aria-labelledby="license-tab">
                    <license-tab></license-tab>
                </div>
            </div>
        </div>
    `
}

const documentationPage = ElementFactory({
    tagName: "documentation-page",
    markup: documentationPageMarkup
});

export default documentationPage
