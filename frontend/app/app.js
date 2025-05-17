import { App, Router } from "jolt-ui";
import elements from "./elements";
import routes from "./routes";
import properties from "./properties";
import { MessengerExt } from "./extensions/messenger";
import { startOverlaySpinner, removeOverlaySpinner } from "./utilities/spinner";

const app = new App({
    appName: "Beta cell analysis",
    dataStructure: {
        data: null,
        video: null,
        rois: null,
        preferences: null,
        quicknotes: null
    },
    elements,
    properties,
    router: function(application){
        return new Router({
            baseUrl: "/app",
            routes,
            baseLayout: elements.baseLayout,
            defaultTarget: "#content",
            index: "/",
            app: application
        })
    },
    extensions: {
        messenger: function(application){
            return new MessengerExt(application)
        }
    },
    beforeInit: {
        startOverlaySpinner,
        getSystemProperties: async function(){
            let response = await fetch("/system")
            if(!response?.ok || response?.status != 200 ){
                throw new Error("Failed to start app.");
            }
            response = await response.json();
            for(const [key, value] of Object.entries(response.data)){
                this.properties[key] = value;
            }
        },
        getState: async function(){
            let response = await fetch("/state");
            if(!response?.ok || response?.status != 200){
                throw new Error("Failed to fetch initial state");
            }
            response = await response.json();
            for(const [key, value] of Object.entries(response.data)){
                this.setData(key, value);
            }
        },
        suppressContextMenu: function(){
            //Prevents right click
            document.addEventListener('contextmenu', event => {
                event.preventDefault();
            });
        }
    },
    afterInit: {
        removeOverlaySpinner
    }
})

export default app;
