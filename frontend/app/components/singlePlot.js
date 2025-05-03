import { ElementFactory, defineValue, html, querySelector } from "jolt-ui";
import { initPlot } from "./tsPlot";

async function tsSinglePlotMarkup(){
    return html`
        <div id="ts-plot-single"></div>
    `
}

export function drawTimeSeries(data){
    if(!data || !data.data){
        this.removeTrace();
        return;
    }
    const time = [ ...Array(data.data.length).keys() ].map( i => (i+1)/this.sampling);
    Plotly.addTraces( this.plotDiv, [{
    x: time,
    y: data.data}]);
}

const singlePlot = ElementFactory({
    tagName: "single-plot",
    markup: tsSinglePlotMarkup,
    methods: {
        drawTimeSeries,
        removeTrace: function(){
            if(this.plotDiv.data.length > 0){
                Plotly.deleteTraces(this.plotDiv, 0);
            }
        },
        initPlot
    },
    afterInit: {
        initPlot,
        drawTs: function(){
          if(!this.roi){
            return;
          }
          this.drawTimeSeries(this.roi)
        }
    },
    define: {
        plotDiv: querySelector("#ts-plot-single"),
        plot: defineValue(null),
        sampling: {
            get(){
              return +this.getData("preferences")["sampling"]
            }
        },
        roi: {
            get(){
                const roi = this.getData("rois");
                if(!roi || roi.length == 0){
                    return null;
                }
                return roi[roi.length-1];
            }
        },
        time: defineValue(null)
    }
});

export default singlePlot;
