import { DataContext } from '../../providers/data'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import React, { useContext, useEffect, useState } from 'react'

function BarChart({ groupSize, propName, subPropName, secondSubPropName, thirdSubPropName, titleKey }) {
  const { data, setData } = useContext(DataContext)
  const [chartOptions, setChartOptions] = useState({});

  const [lang, setLang] = useState("fr");
  useEffect(() => {
    setLang(data.lang);
  }, [data.lang]);

  let yearMin = Math.round(data["filters"]["min"]);
  let yearMax = Math.round(data["filters"]["max"]);

  let emptyTxt = data.text ? data.text[data.lang]["DATA_UNKNOWN"] : "";
  let noPropTxt = data.text ? data.text[data.lang]["BAR_NUMBER"] : "";

  let types = [];
  let categories = [];

  let titleDetails = data.text ? `${data.text[data.lang]["CHART_YEARS1"]} ${groupSize} ${data.text[data.lang]["CHART_YEARS2"]}` : "";

  useEffect(() => {
    // Create categories
    for(let i = yearMin; i <= yearMax; i+=parseInt(groupSize)) {
      let maxDate = (i + (groupSize-1));

      if(maxDate > yearMax) {
        maxDate = yearMax;
      }

      if(groupSize === 1) {
        categories.push(i);
      }
      else {
        categories.push(Math.round(i) + "-" + Math.round(maxDate));
      }
    }

    // Get types data
    for(let i = 0; i < data.filteredData.length; i++) {
      let currentType = null;

      if(thirdSubPropName && data["filters"][secondSubPropName]) {
        if(data.filteredData[i][thirdSubPropName]) {
          currentType = types.find(t => t.name === data.filteredData[i][thirdSubPropName]);
        }
        else {
          currentType = types.find(t => t.name === emptyTxt);
        }
      }
      else if(secondSubPropName && data["filters"][subPropName]) {
        if(data.filteredData[i][secondSubPropName]) {
          currentType = types.find(t => t.name === data.filteredData[i][secondSubPropName]);
        }
        else {
          currentType = types.find(t => t.name === emptyTxt);
        }
      }
      else if(data["filters"][propName]) {
        if(data.filteredData[i][subPropName]) {
          currentType = types.find(t => t.name === data.filteredData[i][subPropName]);
        }
        else {
          currentType = types.find(t => t.name === emptyTxt);
        }
      }
      else {
        if(data.filteredData[i][propName]) {
          currentType = types.find(t => t.name === data.filteredData[i][propName]);
        }
        else if(propName === "") {
          currentType = types.find(t => t.name === noPropTxt);
        }
        else {
          currentType = types.find(t => t.name === emptyTxt);
        };
      }

      if(!currentType) {
        let dataType = [];

        for(let i = yearMin; i <= yearMax; i+=parseInt(groupSize)) {
          dataType.push(0);
        }

        if(thirdSubPropName && data["filters"][secondSubPropName]) {
          currentType = {name : data.filteredData[i][thirdSubPropName], data : dataType};
        }
        else if(secondSubPropName && data["filters"][subPropName]) {
          currentType = {name : data.filteredData[i][secondSubPropName], data : dataType};
        }
        else if(data["filters"][propName]) {
          currentType = {name : data.filteredData[i][subPropName], data : dataType};
        }
        else {
          currentType = {name : data.filteredData[i][propName], data : dataType};
        }

        if(currentType.name) {
          types.push(currentType);
        }
        else if(propName === "") {
          types.push({name : noPropTxt, data : dataType});
        }
        else {
          types.push({name : emptyTxt, data : dataType});
        }
      }

      if(data.filteredData[i].year) {
        currentType.data[parseInt(data.filteredData[i].year/groupSize) - parseInt(yearMin/groupSize)] ++;
      }
    }

    // Create chart
    setChartOptions({
      chart: {
        type: 'column',
        height : "600px"
      },
      title: {
        text: data.text ? `${data.text[data.lang][titleKey]} - ${data.text[data.lang]["BARS_TITLE"]} - ${titleDetails}` : ""
      },
      height : "600px",
      xAxis: {
        categories: categories
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: types
    });
  }, [data.filteredData, groupSize]);

  return (
    <div className="chart">
      <HighchartsReact
        containerProps={{ style: { height: "600" } }}
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  )
}

export default BarChart
