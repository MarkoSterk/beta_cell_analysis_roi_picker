import { ElementFactory, html, defineValue, querySelector } from "jolt-ui";

async function tsPlotMarkup(){
    return html`
      <div id="ts-plot-all"></div>
    `
}

export function drawTimeSeries(data){
    const time = [ ...Array(data.data.length).keys() ].map( i => (i+1)/this.sampling);
    Plotly.addTraces( this.plotDiv, [{
    x: time,
    y: data.data}]);
}

export function removeTrace(index){
  Plotly.deleteTraces(this.plotDiv, index);
}

function purgeTraces(){
  Plotly.purge(this.plotDiv);
}

export function initPlot(){
    if(this.plotDiv){
        this.plot = Plotly.newPlot( this.plotDiv, [], 
            {
                margin: { t: 0, b: 45, r: 0 },
                showlegend: false,
                // width: this.attrs.width,
                height: this.attrs.height,
                xaxis: {
                    title: {
                      text: 'time [s]',
                      standoff: 5,
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    },
                  },
                  yaxis: {
                    title: {
                      text: 'Cell signal (a.u.)',
                      standoff: 5,
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    }
                  }
            },{
                displaylogo: false,
                modeBarButtonsToRemove: ['select2d', 'lasso2d'],
                responsive: true,
        });
    }
}

const tsPlotAll = ElementFactory({
    tagName: "ts-plot-all",
    markup: tsPlotMarkup,
    methods: {
      drawTimeSeries,
      removeTrace,
      purgeTraces,
      initPlot,
    },
    afterInit: {
        initPlot,
        drawTs: function(){
          if(!this.rois){
            return;
          }
          for(const roi of this.rois){
            this.drawTimeSeries(roi)
          }
        }
    },
    define: {
        plotDiv: querySelector("#ts-plot-all"),
        plot: defineValue(null),
        sampling: {
          get(){
            return +this.getData("preferences")["sampling"]
          }
        },
        rois: {
          get(){
              return this.getData("rois")
          }
      }
    }
})

export default tsPlotAll
