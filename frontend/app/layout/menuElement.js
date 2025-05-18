import { ElementFactory, html, css, querySelectorAll, querySelector, defineValue } from "jolt-ui";
import { handleFile, checkProgress, handleFailedProgressCheck } from "../components/uploadDropZone";
import { startOverlaySpinner, removeOverlaySpinner } from "../utilities/spinner";
import { tryNativeExport } from "../components/videoPlayer";

async function menuElementMarkup(){
    return html`
    <ul class="menu-bar m-0 p-0">
      <!-- File Menu -->
      <li class="dropdown">
        <a jolt-click="toggleDropdown" :menu="fileDropdown">File</a>
        <ul id="fileDropdown" class="dropdown-menu">
          <li data-bind="app.video">
            {{? this.video != null }}
            <a role="button" jolt-click="newProject">New</a>
            {{?}}
          </li>
          <li data-bind="app.video">
            {{? this.video == null }}
            <a role="button" jolt-click="handleFileClick">Import LIF</a>
            {{?}}
          </li>
          <li><a role="button" jolt-click="openProject">Open project</a></li>
          <li data-bind="app.video">
            {{? this.video != null }}
              <a
                role="button"
                jolt-click="saveProject"
                :next="native_save_project"
              >Save project</a>
            {{?}}
          </li>

          <li class="dropdown-submenu" data-bind="app.rois">
            {{? this.selectedRois.length != 0 }}
              <a href="#">Export <i class="fas fa-chevron-right"></i></a>
              <ul class="dropdown-menu">
                <li><a role="button" jolt-click="nativeExport" :next="native_export_timeseries">Time series</a></li>
                <li><a role="button" jolt-click="nativeExport" :next="native_export_coordinates">Coordinates</a></li>
              </ul>
            {{?}}
          </li>

          <hr class="p-0 m-0" />
          <li><a role="button" jolt-click="shutdownApp">Exit</a></li>
        </ul>
      </li>

      <!-- Preferences -->
      <li class="dropdown">
        <a
          role="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#analysisConfigs"
          aria-controls="analysisConfigs"
        >Preferences</a>
      </li>

      <!-- Help Menu -->
      <li class="dropdown">
        <a jolt-click="toggleDropdown" :menu="helpDropdown">Help</a>
        <ul id="helpDropdown" class="dropdown-menu">
          <li><a href="/app/documentation" jolt-click="closeMenus">Documentation</a></li>
          <li><a role="button" jolt-click="openAboutModal">About</a></li>
        </ul>
      </li>

      <!-- Quick Notes toggle -->
      <li class="w-100" data-bind="app.video">
        {{? this.video != null }}
        <span class="float-end" data-bind="app.project">
          <a
            role="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#quickNotes"
            aria-controls="quickNotes"
            title="Quick notes"
          >
            <i class="far fa-sticky-note fa-lg"></i>
          </a>
        </span>
        {{?}}
      </li>
    </ul>

    `
}

async function shutdownConfirmed(){
  startOverlaySpinner();
  let response = await window.pywebview.api.shutdown()
  if(!response.ok){
    removeOverlaySpinner();
    return this.ext.messenger.setMessage({msg: "Something went wrong. Failed to shutdown.", status: "danger"})
  }
}

async function shutdownApp(elem, event, args){
  this.closeMenus();
  this.ext.messenger.confirmModal({
    title: "Please confirm",
    content: "Are you sure you wish to exit the app? All unsaved data will be lost.",
    callbackFunction: shutdownConfirmed
  })
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

    /* ====== Second-level submenu ====== */
    .dropdown-submenu {
      position: relative;
    }
    .dropdown-submenu > .dropdown-menu {
      top: 0;
      left: 100%;
      margin-top: -1px; /* align borders */
      display: none;
    }
    /* show on hover of the parent li */
    .dropdown-submenu:hover > .dropdown-menu {
      display: block;
    }

    `
}

async function openProjectConfirm(){
  startOverlaySpinner();
  const response = await window.pywebview.api.native_open_pkl();
  if(response?.status == "success"){
    location.reload();
    return;
  }
  removeOverlaySpinner();
  this.ext.messenger.setMessage({
    msg: response.message,
    status: response.status
  })
}

async function openProject(elem, event, args){
  this.closeMenus();
  if(this.video != null){
    return this.ext.messenger.confirmModal({
      title: "Confirm",
      content: "Opening a project will remove any unsaved data. Are you sure you wish to continue?",
      callbackFunction: openProjectConfirm
    })
  }
  return this.openProjectConfirm();
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
  event.preventDefault();
  this.closeMenus();
  const response = await window.pywebview.api[args.next]();
  if(response?.status == "aborted"){
    return;
  }
  this.ext.messenger.setMessage({
    msg: response.message,
    status: response.status
  })
}

async function handleFileClick(elem, event, args){
  this.closeMenus();
  this.handleFile();
}

async function openAboutModal(elem, event, args){
  await this.app.ext.messenger.infoModal({
    title: "About",
    content: "<about-info></about-info>",
    modalOptions: {
      size: "modal-lg"
    }
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
  let response = await window.pywebview.api.new_project();
  if(!response?.ok){
    return this.ext.messenger.setMessage({
        msg: "Failed to start new project. Check application.",
        status: "warning"
    })
  }
  location.reload();
}

async function nativeExport(elem, event, args){
  elem.blur();
  this.closeMenus();
  await this.tryNativeExport(elem, event, args);
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
      openAboutModal,
      closeMenus,
      handleFile,
      handleFileClick,
      shutdownApp,
      saveProject,
      openProject,
      openProjectConfirm,
      newProject,
      startNewProject,
      handleFailedProgressCheck,
      checkProgress,
      shutdownConfirmed,
      nativeExport,
      tryNativeExport
    },
    define: {
      homePage: {
        get(){
          return this.app.querySelector("home-page");
        }
      },
      dropdownMenus: querySelectorAll(".dropdown-menu"),
      fileUpload: querySelector('.lif-upload'),
      pklUpload: querySelector('.pkl-upload'),
      checkId: defineValue(null),
      checkDelay: defineValue(3000),
      video: {
        get(){
          return this.getData("video");
        }
      },
      selectedRois: {
            get(){
                return this.getData("rois");
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
