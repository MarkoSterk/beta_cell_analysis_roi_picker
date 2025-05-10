import { ElementFactory, html, defineValue, RequestMaker } from "jolt-ui";

async function aboutInfoMarkup(){
    return html`
        <div class="row">
            <div class="col-12 mx-auto text-center">
                <img src="${this.properties.baseUrl}${this.about.logo}" alt="Logo" width="250" />
            </div>
        </div>
        <div>
            <small class="m-1 d-block">Version: ${this.about.version}</small>
            <small class="m-1 d-block">Homepage: ${this.about.homepage}</small>
            <small class="m-1 d-block">Authors: ${this.about.author}</small>
            <small class="mt-2 d-block text-justify text-muted">${this.about.description}</small>
        </div>
    `
}

async function getAboutInfo(){
    if(this.about){
        return;
    }
    let [error, response] = await RequestMaker.get({
        url: "/about"
    })
    if(error){
        return this.ext.messenger.setMessage({
            msg: "Failed to fetch about information",
            status: "warning"
        })
    }
    [error, response] = await response.json();
    if(error){
        return this.ext.messenger.setMessage({
            msg: "Failed to parse about information",
            status: "warning"
        })
    }
    this.about = response.data;
}

const aboutInfo = ElementFactory({
    tagName: "about-info",
    markup: aboutInfoMarkup,
    methods: {
        getAboutInfo
    },
    beforeInit: {
        getAboutInfo
    },
    define: {
        about: defineValue(null)
    }
})

export default aboutInfo;
