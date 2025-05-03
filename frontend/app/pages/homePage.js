import { ElementFactory, html } from "jolt-ui";

async function homePageMarkup(){
    return html`
        <div data-bind="app.video">
            {{? this.video == null }}
                <upload-dropzone></upload-dropzone>
            {{??}}
                <video-player></video-player>
            {{?}}
        </div>
    `
}

const homePage = ElementFactory({
    tagName: "home-page",
    markup: homePageMarkup,
    define: {
        video: {
            get(){
                return this.getData("video")
            }
        }
    }
});

export default homePage;
