import { ElementFactory, html } from "jolt-ui";

async function contactTabMarkup(){
    return html`
        <div>
            <div class="border-bottom mb-2">
                <p class="fw-bold">Marko Šterk
                    <span class="ms-1">
                        <a class="text-reset my-1" href="mailto:marko_sterk@hotmail.com" router-ignore="true" target="_blank"><i class="fa-solid fa-at"></i></a>
                        <a class="text-reset my-1" router-ignore="true" href="https://github.com/MarkoSterk" target="_blank"><i class="fa-brands fa-github"></i></a>
                        <a class="text-reset my-1" router-ignore="true" href="https://www.linkedin.com/in/marko-sterk/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                    </span>
                <p>
                <small class="d-block">Institute of Information Science, Prešernova ulica 17, 2000 Maribor, Slovenia</small>
                <small class="d-block">Alma Mater Europaea University, Slovenska ulica 17, 2000 Maribor, Slovenia</small>
                <small class="d-block">University of Maribor, Faculty of Medicine, Institute of Physiology, Taborska ulica 8, 2000 Maribor, Slovenia</small>
                <div>
                    
                </div>
            </div>

            <div class="border-bottom mb-2">
                <p class="fw-bold">Marko Gosak
                    <span class="ms-1">
                        <a class="text-reset my-1" href="mailto:marko.gosak@um.si" router-ignore="true" target="_blank"><i class="fa-solid fa-at"></i></a>
                    </span>
                <p>
                <small class="d-block">University of Maribor, Faculty of Natural Sciences and Mathematics, Koroška cesta 160, 2000 Maribor, Slovenia</small>
                <small class="d-block">University of Maribor, Faculty of Medicine, Institute of Physiology, Taborska ulica 8, 2000 Maribor, Slovenia</small>
                <small class="d-block">Alma Mater Europaea University, Slovenska ulica 17, 2000 Maribor, Slovenia</small>
                <div>
                    
                </div>
            </div>
        </div>
    `
}

const contactTab = ElementFactory({
    tagName: "contact-tab",
    markup: contactTabMarkup
});

export default contactTab
