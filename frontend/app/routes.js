
import homePage from "./pages/homePage"
import documentationPage from "./pages/documentationPage";
const defaultTarget = "#content";

export default function(){
    return [
        {
            path: "/",
            handler: homePage,
            target: defaultTarget
        },
        {
            path: "/documentation",
            handler: documentationPage,
            target: defaultTarget
        }
    ]
}