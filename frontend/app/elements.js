import baseLayout from "./layout/baseLayout";
import menuElement from "./layout/menuElement";

const layoutElements = {
    baseLayout,
    menuElement
}

import homePage from "./pages/homePage";
import documentationPage from "./pages/documentationPage";
const pages = {
    homePage,
    documentationPage
}

import configurationsOffcanvas from "./components/configurationsOffcanvas";
import quickNotesOffcanvas from "./components/quickNotesOffcanvas";
import aboutInfo from "./components/aboutInfo";
import uploadDropZone from "./components/uploadDropZone";
import videoPlayer from "./components/videoPlayer";
import { messengerElement } from "./extensions/messenger";
import tsPlotAll from "./components/tsPlot";
import singlePlot from "./components/singlePlot";
import licenseTab from "./components/licenseTab";
import citationTab from "./components/citationTab";
import contactTab from "./components/contactTab";
import issuesTab from "./components/issuesTab";
import basicUsageTab from "./components/basicUsageTab";

const components = {
    configurationsOffcanvas,
    quickNotesOffcanvas,
    aboutInfo,
    messengerElement,
    uploadDropZone,
    videoPlayer,
    tsPlotAll,
    singlePlot,
    licenseTab,
    citationTab,
    contactTab,
    issuesTab,
    basicUsageTab
}

export default {
    ...layoutElements,
    ...pages,
    ...components
}
