import { DataContext } from '../../providers/data'
import Highcharts from "highcharts";
import drilldow from 'highcharts/modules/drilldown'
import HighchartsReact from 'highcharts-react-official';
import React, { useContext, useEffect, useState } from 'react'

function PieChart({ propName, subPropName, secondSubPropName, thirdSubPropName, titleKey }) {

  drilldow(Highcharts);

  const { data, setData } = useContext(DataContext);
  const [chartOptions, setChartOptions] = useState({});

  const [lang, setLang] = useState("fr");
  useEffect(() => {
    setLang(data.lang);
  }, [data.lang]);

  let emptyTxt = data.text ? data.text[data.lang]["DATA_UNKNOWN"] : "";

  let types = [];
  let subTypes = [];

  useEffect(() => {
    let propNameSelected = propName;
    let subPropNameSelected = subPropName;
    
    if(thirdSubPropName && data["filters"][subPropName]) {
        propNameSelected = secondSubPropName;
        subPropNameSelected = thirdSubPropName;
    }
    else if(secondSubPropName && data["filters"][propName]) {
        propNameSelected = subPropName;
        subPropNameSelected = secondSubPropName;
    }

    // Get types
    for(let i = 0; i < data.filteredData.length; i++) {
        if(data.filteredData[i][propNameSelected]) {
            let currentType = types.find(t => t.name === data.filteredData[i][propNameSelected]);
            if(currentType) {
                currentType.y ++;
            }
            else {
                types.push({name : data.filteredData[i][propNameSelected], y : 1, drilldown : data.filteredData[i][propNameSelected]});
            }
        }
        else {
            let currentType = types.find(t => t.name === emptyTxt);
            if(currentType) {
                currentType.y ++;
            }
            else {
                types.push({name : emptyTxt, y : 1, drilldown : emptyTxt});
            }
        }
    }

    // Get sub types
    if(subPropNameSelected) {
        for(let i = 0; i < data.filteredData.length; i++) {
            let currentType = subTypes.find(t => t.name === data.filteredData[i][propNameSelected]);
            if(currentType) {
                if(data.filteredData[i][subPropNameSelected]) {
                    let currentSubType = currentType.data.find(t => t[0] === data.filteredData[i][subPropNameSelected]);

                    if(currentSubType) {
                        currentSubType[1] ++;
                    }
                    else {
                        currentType.data.push([data.filteredData[i][subPropNameSelected], 1]);
                    }
                }
                else {
                    let currentSubType = currentType.data.find(t => t[0] === emptyTxt);

                    if(currentSubType) {
                        currentSubType[1] ++;
                    }
                    else {
                        currentType.data.push([emptyTxt, 1]);
                    }
                }
            }
            else {
                let subName = data.filteredData[i][subPropNameSelected];
                if(!subName) {
                    subName = emptyTxt;
                }

                subTypes.push(
                    {
                        name : data.filteredData[i][propNameSelected],
                        id : data.filteredData[i][propNameSelected],
                        data: [[subName, 1]]
                    }
                );
            }
        }
    }

    // Create graph
    setChartOptions({
      chart: {
        type: 'pie',
        height : "600px"
      },
      title: {
        text: data.text ? `${data.text[data.lang][titleKey]} - ${data.text[data.lang]["PIE_TITLE"]}` : ""
      },
      subtitle: {
        text: ''
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
      plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y:f}'
            }
        }
      },
      series: [
        {
          name: "Types",
          colorByPoint: true,
          data: types
        }
      ],
      drilldown: {
        series: subTypes
      }
    });
  }, [data.filteredData]);

    return (
        <div className="chart">
          <HighchartsReact
            containerProps={{ style: { height: "600px" } }}
            highcharts={Highcharts}
            options={chartOptions}
          />
        </div>
    )
}

export default PieChart