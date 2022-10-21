import styled from 'styled-components'
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/data'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap'

function HeatMap() {

  heatmap(Highcharts);

  const { data } = useContext(DataContext)
  const [chartOptions, setChartOptions] = useState({});

  const { chartType } = useParams();

  let yearMin = data["filters"]["min"];
  let yearMax = data["filters"]["max"];
  let chartData = [];

  let title = "";

  const [invalidMessage, setInvalidMessage] = useState("");

  useEffect(() => {

    if(data.text) {

      yearMin = data["filters"]["min"];
      yearMax = data["filters"]["max"];
      chartData = [];
      let maxValue = 0;
      let yMax = 12;
      let yMin = 1;

      let tickPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

      let categories = [''];
      categories.push(data.text ? data.text[data.lang]["MONTHS_JANUARY"] : "");
      categories.push(data.text ? data.text[data.lang]["MONTHS_FEBRUARY"] : "");
      categories.push(data.text ? data.text[data.lang]["MONTHS_MARCH"] : "");
      categories.push(data.text ? data.text[data.lang]["MONTHS_APRIL"] : "");
      categories.push(data.text ? data.text[data.lang]["MONTHS_MAY"] : "");
      categories.push(data.text ? data.text[data.lang]["MONTHS_JUNE"] : "");
      categories.push(data.text ? data.text[data.lang]["MONTHS_JULY"] : "");
      categories.push(data.text ? data.text[data.lang]["MONTHS_AUGUST"] : "");
      categories.push(data.text ? data.text[data.lang]["MONTHS_SEPTEMBRE"] : "");
      categories.push(data.text ? data.text[data.lang]["MONTHS_OCTOBER"] : "");
      categories.push(data.text ? data.text[data.lang]["MONTHS_NOVEMBRE"] : "");
      categories.push(data.text ? data.text[data.lang]["MONTHS_DECEMBER"] : "");

      if(chartType === "years") {
        for(let i = yearMin; i < yearMax; i+=10) {
          for(let j = 0; j <= 9; j++) {
            chartData.push({
              x: parseInt(i / 10),
              y: j,
              value: 0
            });
          }
        }

        for(let i = 0; i < data.filteredData.length; i++) {
          let selectedChartData = chartData.find(d => d.x * 10 + d.y === data.filteredData[i].year);

          if(selectedChartData) {
            selectedChartData.value ++;

            selectedChartData.value > maxValue ? maxValue = selectedChartData.value : maxValue = maxValue;
          }
        }

        yMin = 0;
        yMax = 9;
        categories = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        yearMin = yearMin/10;
        yearMax = yearMax/10;
      }
      else if (chartType === "days") {

        let change = false;
        let reDisplay = false;      
        if(!invalidMessage && yearMax - yearMin > 100) {
          setInvalidMessage(data.text[data.lang]["HEATMAP_PERIOD_TOO_LONG"] + 100);
          change = true;
        }
        else if(invalidMessage && yearMax - yearMin <= 100) {
          setInvalidMessage("");
          reDisplay = true;
        }

        if((!change && !invalidMessage) || reDisplay) {

          categories = [];
          for(let i = 1; i <= 31; i++) {
            categories.push(i);
          }

          for(let i = yearMin; i < yearMax; i++) {
            for(let j = 1; j <= 12; j++) {
              for(let k = 1; k <= 31; k++) {
                chartData.push({
                  x: (i * 12) + (j-1),
                  y: k,
                  value: 0
                });
              }
            }
          }

          for(let i = 0; i < data.filteredData.length; i++) {
            let selectedChartData = chartData.find(d => d.x === (data.filteredData[i].year * 12) + (data.filteredData[i].month_num-1) && d.y === data.filteredData[i].day);

            if(selectedChartData) {
              selectedChartData.value ++;

              selectedChartData.value > maxValue ? maxValue = selectedChartData.value : maxValue = maxValue;
            }
          }

          yearMin = yearMin*12;
          yearMax = yearMax*12;
          yMin = 1;
          yMax = 31;
          tickPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        }
      }
      else if(chartType === "daysOfWeek") {

        // 
        categories = [
          data.text ? data.text[data.lang]["DAYS_MONDAY"] : "", 
          data.text ? data.text[data.lang]["DAYS_TUESDAY"] : "", 
          data.text ? data.text[data.lang]["DAYS_WEDNESDAY"] : "", 
          data.text ? data.text[data.lang]["DAYS_THURSDAY"] : "", 
          data.text ? data.text[data.lang]["DAYS_FRIDAY"] : "", 
          data.text ? data.text[data.lang]["DAYS_SATURDAY"] : "", 
          data.text ? data.text[data.lang]["DAYS_SUNDAY"] : ""
        ];
        tickPositions = [0, 1, 2, 3, 4, 5, 6];

        for(let i = yearMin; i < yearMax; i++) {
          for(let j = 0; j < categories.length; j++) {
            chartData.push({
              x: parseInt(i),
              y: parseInt(j),
              value: 0
            });
          }
        }

        let keyDays = {};
        keyDays[data.text[data.lang]["DAYS_MONDAY"]] = 0;
        keyDays[data.text[data.lang]["DAYS_TUESDAY"]] = 1;
        keyDays[data.text[data.lang]["DAYS_WEDNESDAY"]] = 2;
        keyDays[data.text[data.lang]["DAYS_THURSDAY"]] = 3;
        keyDays[data.text[data.lang]["DAYS_FRIDAY"]] = 4;
        keyDays[data.text[data.lang]["DAYS_SATURDAY"]] = 5;
        keyDays[data.text[data.lang]["DAYS_SUNDAY"]] = 6;

        for(let i = 0; i < data.filteredData.length; i++) {
          let selectedChartData = chartData.find(d => {
              if(d.x === data.filteredData[i].year) {
                if(data.filteredData[i].day_week === data.text[data.lang]["DAYS_MONDAY"] && d.y === 0) {
                  return true;
                }
                else if(data.filteredData[i].day_week === data.text[data.lang]["DAYS_TUESDAY"] && d.y === 1) {
                  return true;
                }
                else if(data.filteredData[i].day_week === data.text[data.lang]["DAYS_WEDNESDAY"] && d.y === 2) {
                  return true;
                }
                else if(data.filteredData[i].day_week === data.text[data.lang]["DAYS_THURSDAY"] && d.y === 3) {
                  return true;
                }
                else if(data.filteredData[i].day_week === data.text[data.lang]["DAYS_FRIDAY"] && d.y === 4) {
                  return true;
                }
                else if(data.filteredData[i].day_week=== data.text[data.lang]["DAYS_SATURDAY"] && d.y === 5) {
                  return true;
                }
                else if(data.filteredData[i].day_week === data.text[data.lang]["DAYS_SUNDAY"] && d.y === 6) {
                  return true;
                }
              }

              return false;
            }
          );

          if(selectedChartData) {
            selectedChartData.value ++;

            selectedChartData.value > maxValue ? maxValue = selectedChartData.value : maxValue = maxValue;
          }
        }

        yMin = 0;
        yMax = 6;
      }
      else {
        for(let i = yearMin; i < yearMax; i++) {
          for(let j = 1; j <= 12; j++) {
            chartData.push({
              x: i,
              y: j,
              value: 0
            });
          }
        }

        for(let i = 0; i < data.filteredData.length; i++) {
          let selectedChartData = chartData.find(d => d.x === data.filteredData[i].year && d.y === data.filteredData[i].month_num);

          if(selectedChartData) {
            selectedChartData.value ++;

            selectedChartData.value > maxValue ? maxValue = selectedChartData.value : maxValue = maxValue;
          }
        }
      }

      // Init title
      if(chartType === "years") {
        title = data.text ? data.text[data.lang]["HEATMAP_YEARS"] : "";
      }
      else if(chartType === "days") {
        title = data.text ? data.text[data.lang]["HEATMAP_DAY"] : "";
      }
      else if(chartType === "daysOfWeek") {
        title = data.text ? data.text[data.lang]["HEATMAP_DAY_OF_WEEK"] : "";
      }
      else {
        title = data.text ? data.text[data.lang]["HEATMAP_MONTHS"] : "";
      }

      setChartOptions({
        boost: {
          useGPUTranslations: true
        },
        series: [{
          boostThreshold: 100,
          turboThreshold: Number.MAX_VALUE, // #3404, remove after 4.0.5 release
          data: chartData
        }],
        chart: {
          type: 'heatmap',
          height : "600px"
        },
        title: {
          text: title,
          align: 'left',
          x: 40
        },
        xAxis: {
          type: 'number',
          min: yearMin,
          max: yearMax,
          labels: {
            formatter: function() {
              if(chartType === "days") {
                let month = this.value%12+1;
                if(month < 10) {
                  month = "0"+month;
                }

                return month + "/" + parseInt(this.value/12);
              }
              else if(chartType === "years") {
                return this.value + "0";
              }
              else {
                return this.value;
              }
            }
          }
        },
        yAxis: {
          categories: categories,
          minPadding: 0,
          maxPadding: 0,
          startOnTick: false,
          endOnTick: false,
          tickPositions: tickPositions,
          tickWidth: 1,
          min: yMin,
          max: yMax,
          reversed: true
        },
        colorAxis: {
          stops: [
            [0, '#ffffff'],
            [1, '#ff0000']
          ],
          min: 0,
          max: maxValue,
          startOnTick: false,
          endOnTick: false,
          labels: {
            format: '{value}'
          }
        },
        tooltip: {
          formatter: function () {
            if(chartType === "years") {
              return `<b>${this.point.value}</b><br><b>${this.point.x}${this.point.y}</b>`;
            }
            else if(chartType === "days") {
              let day = this.point.y;
              if(day < 10) {
                day = "0"+day;
              }

              let month = this.point.x%12+1;
              if(month < 10) {
                month = "0"+month;
              }

              return `<b>${this.point.value}</b><br><b>${day}/${month}/${parseInt(this.point.x/12)} </b>`;
            }
            else if(chartType === "daysOfWeek") {
              return `<b>${this.point.value}</b><br><b>${this.point.series["yAxis"].categories[this.point["y"]]} ${this.point.x}</b>`;
            }
            else {
              return `<b>${this.point.value}</b><br><b>${this.point.series["yAxis"].categories[this.point["y"]]} ${this.point.x}</b>`;
            }
          }
        }
      });
    }

  }, [data.filteredData, chartType]);

  return (
    <div>
      {!invalidMessage ?  
        <HighchartsReact
          containerProps={{ style: { height: "700" } }}
          highcharts={Highcharts}
          options={chartOptions}
        />
        : 
        <h3>{invalidMessage}</h3>
      }
    </div>
  )
}

export default HeatMap

