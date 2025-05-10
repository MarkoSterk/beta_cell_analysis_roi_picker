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
                                the same engine is used as is used by the Safari browser. This means that there will be issues with video playback
                                when playback speed is increased beyond 2x. As of now the reason for this issue is unknown, however, we
                                are researching possible solutions and will provide an updated version of the application as soon as we find
                                a viable solution.
                            </p>
                            <p>
                                For the above reason the application on MacOS does not open a native app window but directs the user via the app
                                console to open the app in Google Chrome by visiting http://localhost:8080/app
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
            <p class="fw-bold">If you find any other issues please feel free to contact me or open an issue ticket on the GitHub repository.</p>
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
