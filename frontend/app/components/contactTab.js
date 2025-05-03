import { ElementFactory, html } from "jolt-ui";

async function contactTabMarkup(){
    return html`
        <div class="row">
            <div class="col-2 fw-bold">Author</div>
            <div class="col-10">Marko Šterk</div>
        </div>
        <div class="row">
            <div class="col-2 fw-bold">Affiliations</div>
            <div class="col-10">
                <p>Institute of Information Science, Prešernova ulica 17, 2000 Maribor, Slovenia</p>
                <p>Alma Mater Europaea University, Slovenska ulica 17, 2000 Maribor, Slovenia</p>
                <p>University of Maribor, Faculty of Medicine, Institute of Physiology, Taborska ulica 8, 2000 Maribor, Slovenia</p>
            </div>
        </div>
        <div class="row">
            <div class="col-2 fw-bold">Contact</div>
            <div class="col-10"><a href="mailto:marko_sterk@hotmail.com" router-ignore="true" target="_blank">marko_sterk@hotmail.com</a></div>
        </div>
        <div class="row">
            <div class="col-2 fw-bold">Social media</div>
            <div class="col-10">
                <a class="text-reset d-block" router-ignore="true" href="https://github.com/MarkoSterk" target="_blank">GitHub</a>
                <a class="text-reset d-block" router-ignore="true" href="https://www.linkedin.com/in/marko-sterk/" target="_blank">LinkedIn</a>
            </div>
        </div>
    `
}

const contactTab = ElementFactory({
    tagName: "contact-tab",
    markup: contactTabMarkup
});

export default contactTab
