import { ElementFactory, html } from "jolt-ui";

async function issuesTabMarkup(){
    return html`
        <div>
            <div class="accordion" id="issuesAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" style="background-color: #0078d7;" jolt-click="unfocusBtn" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Video playback issues on MacOS' Safari Browser
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#issuesAccordion">
                        <div class="accordion-body">
                            <p>
                                The application uses the OS' native browser engine for the application window. This means that on MacOS
                                the same engine is used as is used by the Safari browser. For reasons yet unknown, video playback fails
                                if playback speed is increased beyond 2x on MacOS. For this reason, the playback speed is limited to 2x
                                on MacOS machines.
                            </p>
                            <p>
                                We are working on a solution to this problem and will issue a new app release once a stable solution has
                                been found.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" style="background-color: #0078d7;" jolt-click="unfocusBtn" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Frozen video/Still image
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#issuesAccordion">
                        <div class="accordion-body">
                            <p>
                                Sometimes the video player seems frozen (only shows a still image). If no other errors were displayed
                                we suggest you use the <strong><i class="fas fa-sync"></i></strong> button in the preferences tab to
                                reload the application screen. Normally, the video playback starts working afterwards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <p class="fw-bold">If you find any other issues please feel free to contact us or open an issue ticket on the GitHub repository (https://github.com/MarkoSterk/beta_cell_analysis_roi_picker).</p>
        <div>
    `
}

async function unfocusBtn(elem, event, args){
    elem.blur();
}

const issuesTab = ElementFactory({
    tagName: "issues-tab",
    markup: issuesTabMarkup,
    methods: {
        unfocusBtn
    }
});

export default issuesTab;
