import { ElementFactory, html } from "jolt-ui";

async function baseLayoutMarkup() {
    return html`
        <div class="vh-100">
            <messenger-element class="toast-container position-fixed top-0 end-0 p-3"
            style="z-index: 1080;"></messenger-element>
            <div>
                <menu-element></menu-element>
            </div>
            <div id="content" class="p-1">

            </div>
            <div id="configurations">
                <configurations-offcanvas></configurations-offcanvas>
            </div>
            <div id="quick-notes">
                <quick-notes-offcanvas></quick-notes-offcanvas>
            </div>
        </div>
    `
}

const baseLayout = ElementFactory({
    tagName: "base-layout",
    markup: baseLayoutMarkup
});

export default baseLayout
