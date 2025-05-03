import { ElementFactory, html } from "jolt-ui";

async function citationTabMarkup(){
    return html`
    <p>
        Šterk, M., & Gosak, M. (2025). Beta cell analysis: roi picker (Version 1.0.) [Computer software]. https://github.com/MarkoSterk/beta_cell_analysis_roi_picker
    </p>
    `
}

const citationTab = ElementFactory({
    tagName: "citation-tab",
    markup: citationTabMarkup
});

export default citationTab
