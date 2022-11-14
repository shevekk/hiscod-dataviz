import { DataContext } from '../../providers/data'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import React, { useContext, useEffect, useState } from 'react'

Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    if((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) === 0);
};

// Get Day of Year
Date.prototype.getDOY = function() {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = this.getMonth();
    var dn = this.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if(mn > 1 && this.isLeapYear()) dayOfYear++;
    return dayOfYear;
};

function LinesChart({ groupSize, propName, subPropName, secondSubPropName, thirdSubPropName, titleKey }) {
  const { data, setData } = useContext(DataContext)
  const [chartOptions, setChartOptions] = useState({});

  const [lang, setLang] = useState("fr");
  useEffect(() => {
    setLang(data.lang);
  }, [data.lang]);

  let yearMin = Math.round(data["filters"]["min"]);
  let yearMax = Math.round(data["filters"]["max"]);

  let emptyTxt = data.text ? data.text[data.lang]["DATA_UNKNOWN"] : "";
  let noPropTxt = "nombre";

  let types = [];
  let categories = [];

  const [invalidMessage, setInvalidMessage] = useState("");

  /*
   * Check if is this year is a leap year
   * @param {Number}          year          The target year
   * @return {Boolean}                      True is a leap year 
   */
  const leapYear = (year) => {
    if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  /*
   * Convert a year to days numbers
   * @param {Number}          year          The target year
   * @return {Number}                       The day numbers
   */
  const yearsToDaysNumber = (year) => {
    let dayNumber = 0;
    for(let i = 0; i < year; i++)
    {
      if(leapYear(i))
      {
        dayNumber += 366;
      }
      else
      {
        dayNumber += 365;
      }
    }
    return dayNumber;
  }

  useEffect(() => {

    types = [];
    categories = [];

    // Create detail of title
    let titleDetails = "";
    if(groupSize === "month") {
      titleDetails = data.text ? data.text[data.lang]["CHART_MONTHS"] : "";
    }
    else if(groupSize === "days") {
      titleDetails = data.text ? data.text[data.lang]["CHART_DAYS"] : "";
    }
    else {
      titleDetails = data.text ? `${data.text[data.lang]["CHART_YEARS1"]} ${groupSize} ${data.text[data.lang]["CHART_YEARS2"]}` : "";
    }

    // Create categories
    if(groupSize === "month") {
      for(let i = yearMin; i <= yearMax; i+=1) {
        for(let j = 0; j < 12; j+=1) {

          let month_num = j+1;
          if(month_num < 10)
            month_num = "0" + month_num;

          categories.push(month_num + "/" + i);
        }
      }

      if(yearMax - yearMin > 50) {
        setInvalidMessage(data.text ? data.text[data.lang]["LINE_YEARS_MAX_FOR_MONTH"] : "");
      }
      else {
        setInvalidMessage("");
      }
    }
    else if(groupSize === "days") {

      for(let i = yearMin; i <= yearMax; i+=1) {
        let doy = 365;
        if(leapYear(i)) {
         doy = 366;
        }

        for(let j = 0; j < doy; j+=1) {

          let date = new Date(i, 0, j);

          let month_num = date.getMonth()+1;
          if(month_num < 10)
            month_num = "0" + month_num;
          
          let day_num = date.getDate();
          if(day_num < 10)
            day_num = "0" + date.getDate();
          
          categories.push(day_num + "/" + month_num + "/" + i);
        }
      }

      if(yearMax - yearMin > 5) {
        setInvalidMessage(data.text ? data.text[data.lang]["LINE_YEARS_MAX_FOR_DAYS"] : "");
      }
      else {
        setInvalidMessage("");
      }
    }
    else {
      for(let i = yearMin; i <= yearMax; i+=parseInt(groupSize)) {
        let maxDate = (i + (groupSize-1));

        if(maxDate > yearMax) {
          maxDate = yearMax;
        }

        if(groupSize === 1 || groupSize === "1") {
          categories.push(i);
        }
        else {
          categories.push(Math.round(i) + "-" + Math.round(maxDate));
        }
      }

      setInvalidMessage("");
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
        else if(propName == "") {
          currentType = types.find(t => t.name === noPropTxt);
        }
        else {
          currentType = types.find(t => t.name === emptyTxt);
        }
      }

      if(!currentType) {
        let dataType = [];

        if(groupSize === "month") {
          for(let i = yearMin; i <= yearMax; i+=1) {
            for(let j = 0; j < 12; j+=1) {
              dataType.push(0);
            }
          }
        }
        else if(groupSize === "days") {
          for(let i = yearMin; i <= yearMax; i+=1) {
            let doy = 365;
            if(leapYear(i)) {
             doy = 366;
            }

            for(let j = 0; j < doy; j+=1) {
              dataType.push(0);
            }
          }
        }
        else {
          for(let i = yearMin; i <= yearMax; i+=parseInt(groupSize)) {
            dataType.push(0);
          }
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
      if(groupSize === "month") {
        if(data.filteredData[i].year && data.filteredData[i].month_num) {
          currentType.data[(data.filteredData[i].year * 12 + data.filteredData[i].month_num) - (parseInt(yearMin) * 12)] ++;
        }
      }
      else if(groupSize === "days") {
        if(data.filteredData[i].year && data.filteredData[i].month_num && data.filteredData[i].day) {
          let date = new Date(data.filteredData[i].year, data.filteredData[i].month_num-1, data.filteredData[i].day);
          currentType.data[yearsToDaysNumber(parseInt(data.filteredData[i].year)) + (date.getDOY()) - yearsToDaysNumber(parseInt(yearMin))] ++;
        }
      }
      else {
        if(data.filteredData[i].year) {
          currentType.data[parseInt(data.filteredData[i].year/groupSize) - parseInt(yearMin/groupSize)] ++;
        }
      }
    }

    // Create chart
    setChartOptions({
        chart: {
          type: 'line',
          height : "600px"
        },
        title: {
          text: data.text ? `${data.text[data.lang][titleKey]} - ${data.text[data.lang]["LINES_TITLE"]} - ${titleDetails}` : ""
        },
        xAxis: {
          categories: categories
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        series: types
      });
  }, [data.filteredData, groupSize]);

  return (
    <div className="chart">
      {!invalidMessage ?  
      <HighchartsReact
        containerProps={{ style: { height: "600px" } }}
        highcharts={Highcharts}
        options={chartOptions}
      />
      : 
        <h3>{invalidMessage}</h3>
      }
    </div>
  )
}

export default LinesChart
