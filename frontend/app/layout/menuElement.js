import { ElementFactory, html, css, querySelectorAll, querySelector } from "jolt-ui";
import { handleFile } from "../components/uploadDropZone";
import { startOverlaySpinner, removeOverlaySpinner } from "../utilities/spinner";

async function menuElementMarkup(){
    return html`
    <ul class="menu-bar" class="m-0 p-0">
        <!-- File Menu -->
        <li class="dropdown">
            <a jolt-click="toggleDropdown" :menu="fileDropdown">File</a>
            <ul id="fileDropdown" class="dropdown-menu">
                <li data-bind="video">
                  {{? this.video != null }}
                    <a role="button" jolt-click="newProject">New</a>
                  {{?}}
                </li>
                <li data-bind="app.video">
                  {{? this.video == null }}
                    <a role="button" jolt-click="importLif">Import LIF</a>
                  {{?}}
                </li>
                <input class="lif-upload" type="file" accept=".lif" jolt-change="uploadFile" hidden>
                <li><a role="button" jolt-click="openProject">Open project</a></li>
                <input class="pkl-upload" type="file" accept=".pkl" jolt-change="uploadPkl" hidden>
                <li><a href="/api/v1/files/save-project" jolt-click="saveProject" :next="native_save_project" target="_blank" router-ignore="true">Save project</a></li>
                <hr class="p-0 m-0" />
                <li><a role="button" jolt-click="shutdownApp">Exit</a></li>
            </ul>
        </li>
        <li class="dropdown">
          <a role="button" data-bs-toggle="offcanvas" 
              data-bs-target="#analysisConfigs" aria-controls="analysisConfigs">
                Preferences
            </a>
        </li>
        <!-- Edit Menu -->
        <!-- Help Menu -->
        <li class="dropdown">
            <a jolt-click="toggleDropdown" :menu="helpDropdown">Help</a>
            <ul id="helpDropdown" class="dropdown-menu">
                <li><a href="/app/documentation" jolt-click="closeMenus">Documentation</a></li>
                <li><a role="button" jolt-click="openAboutModal">About</a></li>
            </ul>
        </li>
        <li class="w-100" data-bind="app.video">
          {{? this.video != null }}
            <span class="float-end" data-bind="app.project">
              <a role="button" data-bs-toggle="offcanvas" data-bs-target="#quickNotes" 
                aria-controls="quickNotes" title="Quick notes">
                <i class="far fa-sticky-note fa-lg"></i>
              </a>
            </span>
          {{?}}
        </li>
    </ul>
    `
}

async function shutdownApp(elem, event, args){
  startOverlaySpinner();
  let response = await fetch("/shutdown");
  if(!response.ok || response?.status != 200){
    removeOverlaySpinner();
    return this.ext.messenger.setMessage({msg: "Something went wrong. Failed to shutdown.", status: "danger"})
  }
  window.close()
}

async function menuElementStyle(){
    return css`
    /* Custom styling to mimic a Windows menu bar */
    .menu-bar {
      background-color: #0078d7; /* Windows blue */
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
    }
    .menu-bar li {
      position: relative;
    }
    .menu-bar a {
      display: block;
      padding: 10px 20px;
      color: white;
      text-decoration: none;
      cursor: pointer;
    }
    .menu-bar a:hover {
      background-color: #005a9e;
    }
    /* Dropdown styles */
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      display: none;
      background-color: #fff;
      border: 1px solid #ccc;
      min-width: 150px;
      z-index: 1000;
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .dropdown-menu li a {
      color: #000;
      padding: 10px 15px;
      display: block;
      text-decoration: none;
    }
    .dropdown-menu li a:hover {
      background-color: #f1f1f1;
    }
    .show {
      display: block;
    }
    `
}

async function openProject(elem, event, args){
  elem.blur();
  this.pklUpload.click();
}

async function uploadPkl(elem){
  if(!elem?.files || !elem.files[0]){
    return;
  }
  const payload = new FormData();
  payload.append("file", elem.files[0])
  startOverlaySpinner()
  let response = await fetch("/api/v1/files/open-project", {
    method: "POST",
    body: payload,
  });
  if(!response || !response.ok || response?.status != 200){
    return this.ext.messenger.setMessage({
      msg: "Failed to parse LIF file.",
      status: "warning"
  })
  }
  response = await response.json();
  location.reload();
}

function toggleDropdown(elem, event, args) {
  // Hide any other open dropdowns
  this.dropdownMenus.forEach(function(menu) {
    if (menu.id !== args.menu) {
      menu.classList.remove('show');
    }
  });
  // Toggle the selected dropdown
  document.getElementById(args.menu).classList.toggle('show');
}

function closeOnMissclick(event) {
  if (!event.target.matches('.menu-bar a')) {
    this.dropdownMenus.forEach(function(menu) {
      menu.classList.remove('show');
    });
  }
};

function closeMenus(){
  this.dropdownMenus.forEach((menu) => {
    menu.classList.remove('show')
  })
}

async function saveProject(elem, event, args){
  elem.blur();
  this.closeMenus();
  if(!window.pywebview){
    return;
  }
  event.preventDefault();
  await window.pywebview.api[args.next]();
}

async function importLif(elem, event, args){
  elem.blur();
  if(args?.disabled){
    return;
  }
  this.closeMenus();
  this.fileUpload.click();
}

async function uploadFile(elem, event, args){
  const file = elem.files[0];
  await this.handleFile(file)
}

async function openAboutModal(elem, event, args){
  await this.app.ext.messenger.infoModal({
    title: "About",
    content: "<about-info></about-info>"
  })
}

async function newProject(elem, event, args){
  this.closeMenus();
  await this.app.ext.messenger.confirmModal({
    title: "New project",
    content: "Are you sure you want to start a new project? All current data will be deleted.",
    callbackFunction: async (event, modal) => {
      await this.startNewProject()
    }
  })
}

async function startNewProject(){
  let response = await fetch("/new-project");
  if(!response || !response?.ok || response?.status != 200){
    this.ext.messenger.setMessage({
      msg: "Failed to start new project. Check application.",
      status: "warning"
  })
  }
  location.reload();
}

const menuElement = ElementFactory({
    tagName: "menu-element",
    markup: menuElementMarkup,
    css: {
        scoped: false,
        style: menuElementStyle
    },
    methods: {
      toggleDropdown,
      closeOnMissclick,
      importLif,
      openAboutModal,
      closeMenus,
      handleFile,
      uploadFile,
      shutdownApp,
      saveProject,
      openProject,
      uploadPkl,
      newProject,
      startNewProject
    },
    define: {
      dropdownMenus: querySelectorAll(".dropdown-menu"),
      fileUpload: querySelector('.lif-upload'),
      pklUpload: querySelector('.pkl-upload'),
      video: {
        get(){
          return this.getData("video");
        }
      }
    },
    afterInit: {
      addClickListener: function(){
        this.app.addEventListener("click", this.closeOnMissclick);
      }
    },
    afterDisconnect: {
      removeClickListener: function(){
        this.app.removeEventListener("click", this.closeOnMissclick);
      }
    }
});

export default menuElement;
