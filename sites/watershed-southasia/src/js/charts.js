import { titleCase } from './util.js';
const echarts = require('echarts');
const L = require('leaflet');
const _ = require('lodash');

export const initChart = (figure, data) => {
  let id = figure['title'].split(" ")[0];
  let html = `<div class="col-md-` + figure['width'] + `">
              <div class="card">
                <div class="card-header gradient-card-header">` + titleCase(figure['title']) + `</div>
                <div class="card-body">
                  <div id="` + id + `" style="height:450px"></div>
                </div>
                <div class="card-footer text-muted">` + figure['content'] + `</div>
              </div>
              </div>`;
  $("#" + figure['position']).append(html);
  var element = document.getElementById(id);
  var myChart = echarts.init(element);
  myChart['figure'] = figure;
  
  let indexLegend = data.names.indexOf(figure['legend']);
  let indexX = data.names.indexOf(figure['x']);
  let legend = _(data.values).map(x => x[indexLegend] ).uniq().value();
  let xAxis = _(data.values).map(x => x[indexX] ).uniq().value();
  let sums = _(data.values).countBy(indexX).value();

  let series = _(data.values).groupBy(indexLegend).map((items, val) => {
      let values = _(items).countBy(indexX).value();
      let dataSeries = _(xAxis).map(x => {
          let defVal = values[x] == undefined ? null : values[x];
          if (defVal === null || defVal === 0) {
              return null;
          }
          return ((defVal * 100) / sums[x]).toFixed(0);
      }).value();

      return {
          name: val,
          type: 'bar',
          stack: "total",
          zLevel: 3,
          label: {
              normal: {
                  fontSize: 14,
                  show: true,
                  position: "inside",
                  formatter: "{c}%"
              }
          },
          data: dataSeries
      }
  }).value();

  myChart.setOption({
      tooltip: {},
      legend: { data: legend },
      xAxis: {
          data: xAxis,
          axisLabel: {
              rotate: 305
          } 
      },
      yAxis: {},
      series
  });

  return myChart;
}

export const updateChart = (chart, data) => {
  let figure = chart['figure'];
  let indexLegend = data.names.indexOf(figure['legend']);
  let indexX = data.names.indexOf(figure['x']);
  let legend = _(data.values).map(x => x[indexLegend] ).uniq().value();
  let xAxis = _(data.values).map(x => x[indexX] ).uniq().value();
  let sums = _(data.values).countBy(indexX).value();

  let series = _(data.values).groupBy(indexLegend).map((items, val) => {
      let values = _(items).countBy(indexX).value();
      let dataSeries = _(xAxis).map(x => {
          let defVal = values[x] == undefined ? 0 : values[x];
          return Math.round((defVal * 100) / sums[x]);
      }).value();

      return {
          name: val,
          type: 'bar',
          stack: "total",
          zLevel: 3,
          label: {
              normal: {
                  fontSize: 14,
                  show: true,
                  position: "inside",
                  formatter: "{c}%"
              }
          },
          data: dataSeries
      }
  }).value();

  chart.setOption({
      tooltip: {},
      legend: { data: legend },
      xAxis: {
          data: xAxis,
          axisLabel: {
              rotate: 305
          } 
      },
      yAxis: {},
      series
  });
}