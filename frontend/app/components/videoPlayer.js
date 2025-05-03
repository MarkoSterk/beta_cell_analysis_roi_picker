import { ElementFactory, defineValue, querySelector, dataEventEnum, RequestMaker } from "jolt-ui";
import { startOverlaySpinner, removeOverlaySpinner } from "../utilities/spinner";

function getRoiData(ellipseData){
    fetch("/api/v1/roi/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "cors": "no-cors"
        },
        body: JSON.stringify({
            roi_type: "ellipse",
            roi_data: ellipseData
        })
    }).then(async (response) => {
        if(response.ok){
            response = await response.json();
            //this.selectedRois.push(response.data);
            this.setData("rois", [...this.selectedRois, response.data])
            await this.handleResponse(response);
        }
    }).catch((error) => {
        this.ext.messenger.setMessage({
            msg: "Failed to get ROI information.",
            status: "warning"
        })
    });
}

async function handleResponse(response){
    const data = response.data;
    try{
        this.drawTimeSeries(data);
    }catch(e){
        console.error(e)
    }
    this.redrawCanvas(); // Redraw canvas with all ellipses including the new one
}

async function canvasClick(elem, event){
    switch (event.button){
        case 0:
            if(this.isDPressed == true){
                const rect = this.canvas.getBoundingClientRect();
                let clickX = event.clientX - rect.left;
                let clickY = event.clientY - rect.top;
                const index = this.findClickedEllipseIndex(clickX, clickY);
                if(index != null){
                    let response = await fetch(`/api/v1/roi/${index}`, {method: "DELETE"})
                    if(response.ok){
                        this.selectedRois.splice(index, 1);
                        this.setData("rois", this.selectedRois)
                        this.redrawCanvas();
                        this.removeTrace(index);
                        return;
                    }
                    this.ext.messenger.setMessage({
                        msg: "Failed to delete ROI",
                        status: "warning"
                    })
                    return;
                }
            }
            break;
        case 2:
            const rect = this.canvas.getBoundingClientRect();
            this.startX = event.clientX - rect.left;
            this.startY = event.clientY - rect.top;
            this.isDrawing = true;
            break;
        default:
            //
    }
}

function canvasMouseMove(elem, event){
    if (this.isDrawing) {
        // Clear and redraw canvas with all ellipses
        this.redrawCanvas();
        const rect = canvas.getBoundingClientRect();
        const endX = event.clientX - rect.left;
        const endY = event.clientY - rect.top;
        // Draw the current ellipse without saving
        this.drawEllipse(this.startX, this.startY, endX, endY, false);
    }
}

function canvasMouseUp(elem, event){
    switch (event.button){
        case 0:
            break;
        case 2:
            if (this.isDrawing) {
                const rect = this.canvas.getBoundingClientRect();
                const endX = event.clientX - rect.left;
                const endY = event.clientY - rect.top;
                // Get time series of selected ellipse
                this.getRoiData({
                    startX: Math.round(this.startX),
                    startY: Math.round(this.startY),
                    endX: Math.round(endX), 
                    endY: Math.round(endY)
                });
                
            }
            this.isDrawing = false;
            break;
        default:
            //pass
    }
}

function drawEllipse(x1, y1, x2, y2, clearCanvas = false, color = 'orange', linewidth = 3) {
    // Optionally clear the canvas if save is true
    if (clearCanvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = linewidth;
    this.ctx.beginPath();
    this.ctx.ellipse(
        (x1 + x2) / 2,
        (y1 + y2) / 2,
        Math.abs(x2 - x1) / 2,
        Math.abs(y2 - y1) / 2,
        0,
        0,
        2 * Math.PI
    );
    this.ctx.stroke();
}

function redrawCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    // Redraw all saved ellipses
    this.selectedRois.forEach((ellipse) => {
        const data = ellipse.roi_schema.roi_data
        this.drawEllipse(data.startX, data.startY, data.endX, data.endY);
    });
}

async function setPlaybackSpeed(elem, event, args){
    const value = +elem.value;
    this.video.playbackRate = value;
    event.target.labels[0].innerHTML = `Speed: ${value}x`
}

async function seek(elem, event, args){
    const seekBarPos = event.offsetX / elem.offsetWidth;
    this.video.currentTime = seekBarPos * video.duration;
}

async function updateSeekBar(){
    const percentage = (this.video.currentTime / this.video.duration) * 100;
    this.seekbar.style.width = percentage + '%';
}

export async function playPauseVideo(elem, event){
    if (this.video.paused || this.video.ended) {
        this.video.play();
        this.playPauseButton.textContent = 'Pause';
    } else {
        this.video.pause();
        this.playPauseButton.textContent = 'Play';
    }
    elem.blur();
}

async function keyDownHandler(e){
    if(e.key === 'D' || e.key === 'd'){
        this.isDPressed = true;
    }
}

async function keyUpHandler(e){
    if(e.key === 'D' || e.key === 'd'){
        this.isDPressed = false;
    }
}

async function addEventListeners(){
    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler)
}

async function removeEventListeners(){
    document.removeEventListener("keydown", this.keyDownHandler);
    document.removeEventListener("keyup", this.keyUpHandler);
}

function drawTimeSeries(data){
    this.plot.drawTimeSeries(data);
    this.singlePlot.removeTrace();
    this.singlePlot.drawTimeSeries(data);
}

function redrawAllTS(){
    if(this.selectedRois.length < 1){
        return;
    }
    startOverlaySpinner();
    this.plot.purgeTraces();
    this.plot.initPlot();
    for(const data of this.selectedRois){
        this.plot.drawTimeSeries(data);
    }

    this.singlePlot.removeTrace();
    const last = this.selectedRois[this.selectedRois.length - 1]
    this.singlePlot.drawTimeSeries(last);
    removeOverlaySpinner();
}

function findClickedEllipseIndex(clickX, clickY) {
    // Reduce function to find the index of the clicked ellipse
    const clickedIndex = this.selectedRois.reduce((acc, ellipse, index) => {
      // Calculate center, width, and height of the ellipse
      const centerX = (ellipse.roi_schema.roi_data.startX + ellipse.roi_schema.roi_data.endX) / 2;
      const centerY = (ellipse.roi_schema.roi_data.startY + ellipse.roi_schema.roi_data.endY) / 2;
      const radiusX = Math.abs(ellipse.roi_schema.roi_data.endX - ellipse.roi_schema.roi_data.startX) / 2;
      const radiusY = Math.abs(ellipse.roi_schema.roi_data.endY - ellipse.roi_schema.roi_data.startY) / 2;
      
      // Check if the click is within the ellipse using the ellipse equation
      const isClicked = ((((clickX - centerX) ** 2) / radiusX ** 2) + (((clickY - centerY) ** 2) / radiusY ** 2)) <= 1;
  
      // If clicked inside the ellipse and no previous ellipse was clicked, update the accumulator
      if (isClicked && acc === null) {
        return index; // Return the current index
      }
  
      return acc; // Return the accumulator (unchanged if not clicked inside this ellipse)
    }, null); // Initial value is null (no ellipse clicked)
  
    return clickedIndex;
}

function removeTrace(index){
    this.plot.removeTrace(index);
    this.singlePlot.removeTrace();
    const last = this.selectedRois[this.selectedRois.length - 1]
    this.singlePlot.drawTimeSeries(last)
}

const videoPlayer = ElementFactory({
    tagName: "video-player",
    markup: async function(){
        return await this.getHTMLtemplate("/video")
    },
    methods: {
        setPlaybackSpeed,
        seek,
        updateSeekBar,
        playPauseVideo,
        canvasClick,
        canvasMouseMove,
        canvasMouseUp,
        drawEllipse,
        keyDownHandler,
        keyUpHandler,
        getRoiData,
        redrawCanvas,
        handleResponse,
        drawTimeSeries,
        findClickedEllipseIndex,
        removeTrace,
        redrawAllTS,
    },
    beforeInit: {
        getInitialSampling: function(){
            this.initialSampling = parseFloat(this.sampling);
        },
        addEventListeners,
        preferencesChange: function(){
            this.app.addEventListener(dataEventEnum.CHANGE, (event) => {
                if(event.detail.field != "preferences"){
                    return;
                }
                if(this.initialSampling == parseFloat(this.sampling)){
                    return;
                }
                this.initialSampling = parseFloat(this.sampling);
                this.redrawAllTS();
            })
        }
    },
    afterInit: {
        drawRois: function(){
            if(!this.selectedRois){
                return;
            }
            this.redrawCanvas();
        }
    },
    afterDisconnect: {
        removeEventListeners
    },
    define: {
        video: querySelector("video"),
        seekbar: querySelector(".seekbar"),
        playPauseButton: querySelector("#play-pause"),
        canvas: querySelector('#canvas'),
        ctx: {
            get(){
                return this.canvas.getContext('2d');
            }
        },
        time: defineValue(null),
        sampling: {
            get(){
                return this.getData("preferences")["sampling"]
            }
        },
        selectedRois: {
            get(){
                return this.getData("rois");
            }
        },
        isDrawing: defineValue(false),
        isDPressed: defineValue(false),
        startX: defineValue(null),
        startY: defineValue(null),
        tsViewer: {
            get(){
                return this.app.querySelector("#ts-viewer")
            }
        },
        plot: {
            get(){
                return this.app.querySelector("ts-plot-all")
            }
        },
        singlePlot: {
            get(){
                return this.app.querySelector("single-plot")
            }
        },
        initialSampling: defineValue(null)
    }
})

export default videoPlayer;
