import { defineValue, ElementFactory, html, querySelector, RequestMaker } from "jolt-ui";

async function configurationsOffcanvasMarkup(){
    return html`
    <div class="offcanvas offcanvas-start w-75" data-bs-backdrop="false" data-bs-scroll="true" tabindex="-1" id="analysisConfigs" aria-labelledby="analysisConfigsLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="analysisConfigsLabel">Preferences</h5>
            <button jolt-click="savePreferences" type="button" class="btn btn text-reset" title="Save and close" data-bs-dismiss="offcanvas" aria-label="Close">
                <i class="fa-solid fa-check"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <div>
                <div class="row vh-100 mx-auto">
                    <form id="configurationsForm">
                        <div class="col-12" data-bind="preferences">
                            <div class="m-3">
                                <div class="row g-3 mb-2">
                                    <div class="col-12 col-md-8 mb-3">
                                        <label for="project_name" class="form-label">Experiment name</label>
                                        <input value="${this.preferences.project_name}" type="text" name="project_name" 
                                        class="form-control" id="project_name" placeholder="Project name">
                                    </div>
                                    <div class="col-12 col-md-4 mb-3">
                                        <label for="sampling" class="form-label">Sampling [Hz]</label>
                                        <input value="${this.preferences.sampling}" type="number" min="0" max="1000" step="0.1" 
                                        name="sampling" class="form-control" id="sampling" placeholder="Sampling rate (Hz)">
                                    </div>
                                </div>
                                <div class="row g-3 mb-2">
                                    <div class="col-12 col-md-6 mb-3">
                                        <label for="px_to_um" class="form-label">Coordinate transform (px to um)</label>
                                        <input value="${this.preferences.px_to_um}" type="number" min="0.01" max="100" 
                                        step="0.01" name="px_to_um" class="form-control" id="px_to_um" placeholder="Coordinate transform">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
    `
}

async function savePreferences(elem, event, args){
    elem.blur();
    const preferences = {
        [this.projectName.id]: this.projectName.value,
        [this.sampling.id]: this.sampling.value,
        [this.pxToUm.id]: this.pxToUm.value
    }
    let [error, response] = await RequestMaker.post({
        url: `${this.properties.apiUrl}/preferences`,
        data: preferences
    });
    if(error){
        return this.ext.messenger.setMessage({
            msg: "Failed to save preferences",
            status: "warning"
        })
    }
    [error, response] = await response.json();
    if(error){
        return this.ext.messenger.setMessage({
            msg: "Failed to parse response from save preferences.",
            status: "warning"
        })
    }
    this.setData("preferences", response.data);
}

async function loadPreferences(){
    let [error, response] = await RequestMaker.get({
        url: `${this.properties.apiUrl}/preferences`
    })
    if(error){
        return this.ext.messenger.setMessage({
            msg: "Failed to load preferences",
            status: "warning"
        })
    }
    [error, response] = await response.json();
    if(error){
        return this.ext.messenger.setMessage({
            msg: "Failed to parse response from load preferences.",
            status: "warning"
        })
    }
    this.setData("preferences", response.data);
}

const configurationsOffcanvas = ElementFactory({
    tagName: "configurations-offcanvas",
    markup: configurationsOffcanvasMarkup,
    methods: {
        savePreferences,
        loadPreferences
    },
    beforeInit: {
        loadPreferences
    },
    define: {
        preferences: defineValue(null),
        projectName: querySelector('#project_name'),
        sampling: querySelector('#sampling'),
        pxToUm: querySelector('#px_to_um'),
        preferences: {
            get(){
                return this.getData("preferences");
            }
        }
    }
});

export default configurationsOffcanvas
