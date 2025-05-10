import { ElementFactory, html } from "jolt-ui";

async function basicUsageTabMarkup(){
    return html`
    <ol>
        <li>
            <strong>Start or Open a Project</strong>
            <ul>
                <li>To begin with existing data, choose <em>File → Open Project</em> 
                and select your saved <code>.pkl</code> file.</li>
                <li>To load a new dataset, choose <em>File → Import LIF</em> and pick 
                your <code>.lif</code> file or drop the .lif file into the dropzone.</li>
            </ul>
        </li>
        <li>
            <strong>Set Your Preferences</strong>
            <ul>
                <li>Open <em>Preferences</em> from the menu bar.</li>
                <li>Enter your <strong>Project Name</strong>.</li>
                <li>Specify the <strong>Sampling Rate</strong> (Hz) for your time‐series data.</li>
                <li>If you need to convert pixel coordinates to micrometers, enter the 
                <strong>Coordinate transform</strong> (µm/px) coefficient.</li>
                <li>Click <i class="fa-solid fa-check"></i> to save.</li>
            </ul>
        </li>
        <li>
            <strong>Select Regions of Interest (ROIs)</strong>
            <ul>
                <li>Play or scrub the video to the frame you want.</li>
                <li>Adjust playback speed as needed.</li>
                <li>Right-click and drag on the video display (upper/left) or the mean frame (lower/right) panel to draw an ellipse for each ROI.</li>
                <li>To remove a ROI, hold down <kbd>D</kbd> and left-click on that ROI.</li>
            </ul>
        </li>
        <li>
            <strong>View Time Series</strong>
            <ul>
                <li>As you create ROIs, the <strong>upper graph</strong> on the right updates to show the time series for all selected cells.</li>
                <li>The <strong>lower graph</strong> shows the time series for the most recently selected ROI or any other ROI you select by right-clicking on it</li>
            </ul>
        </li>
        <li>
            <strong>Export Cell Data</strong>
            <ul>
                <li>When you’ve selected all your ROIs, click <em>Export Time Series</em> (below the video) to save time series of all ROIs as <code>.txt</code> file.</li>
                <li>Click <em>Export Coordinates</em> to save the x,y positions of each ROI as a separate <code>.txt</code> file.</li>
            </ul>
        </li>
        <li>
            <strong>Add Quick Notes</strong>
            <ul>
                <li>Click the <i class="far fa-sticky-notes"></i> icon (far right of the toolbar) to open the Quick Notes panel.</li>
                <li>Type any observations—e.g., tissue drift, multiple islets, response quality, etc.</li>
                <li>Click <i class="fa-solid fa-check"></i> to save the quicknotes.</li>
            </ul>
        </li>
        <li>
            <strong>Save Notes as PDF</strong>
            <ul>
                <li>In the Quick Notes panel, click the <i class="fas fa-save"></i> icon to export your quicknotes as a .pdf file.</li>
            </ul>
        </li>
        <li>
            <strong>Save or Export the Project</strong>
            <ul>
                <li>To bundle everything (video data, preferences, ROIs, quicknotes) into a single file for later work or sharing, choose <em>File → Save Project</em>.</li>
                <li>This creates a <code>.pkl</code> file you can re‐open at any time.</li>
            </ul>
        </li>
            <li>
            <strong>Start a New Project</strong>
            <ul>
                <li>With any project open, you can begin a fresh one by going to <em>File → New Project</em>.</li>
                <li>Repeat steps 1–8 as needed.</li>
            </ul>
        </li>
    </ol>  
    `
}

const basicUsageTab = ElementFactory({
    tagName: "basic-usage-tab",
    markup: basicUsageTabMarkup
});

export default basicUsageTab
