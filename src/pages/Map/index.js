import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/data'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-markercluster";
import { hexbin } from "d3-hexbin";
import React from "react";
import L from "leaflet";
import d3 from "d3";
import LefleatD3 from "@asymmetrik/leaflet-d3";
import { useParams } from 'react-router-dom'

let map = null;

/* Create display map */
function Map() {

    const { data, setData } = useContext(DataContext)

    const [lang, setLang] = useState("fr");
    useEffect(() => {
      setLang(data.lang);
    });

    const { mapType } = useParams();

    const [uiDisplay, setUiDisplay] = useState("block");
    const [txtContent, setTxtContent] = useState("");

    useEffect(() => {

      if(map != null) {
        map.remove();
      }

      // Init map
      map = L.map("map").setView([-37.87, 175.475], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      let listMarkers = [];

      if(mapType == "hex") {

        setUiDisplay("none");

        // Create the hexlayer
        var options = {
          colorRange: [ 'yellow', 'red' ],
          colorScaleExtent: [ undefined, undefined ]
        };
        var hexLayer = L.hexbinLayer(options)
        .hoverHandler(L.HexbinHoverHandler.compound({
          handlers: [
            L.HexbinHoverHandler.resizeFill(),
            L.HexbinHoverHandler.tooltip()
          ]
        }));
        hexLayer.addTo(map);
        
        // Manage click
        hexLayer.dispatch().on('click', function(d, i) {
          //alert("Nombre d'évènements : " + i.length);
          //console.log(i);
          //console.log(d);
        });
        
        // Create chart data
        let chartData = [];
        for(let i = 0; i < data.filteredData.length; i++)
        {
          if(data.filteredData[i].city_latitude && data.filteredData[i].city_longitude) {
            chartData.push([data.filteredData[i].city_longitude, data.filteredData[i].city_latitude]);

            var marker = L.marker([data.filteredData[i].city_latitude, data.filteredData[i].city_longitude]);
            listMarkers.push(marker);
          }
        }

        // Zoom in marker
        if(listMarkers.length > 0) {
          var group = new L.featureGroup(listMarkers);
          map.fitBounds(group.getBounds());
        }

        hexLayer.data(chartData);
      }
      else {
        setUiDisplay("none");

        // Notre cluster
        var markers = L.markerClusterGroup();

        for(let i = 0; i < data.filteredData.length; i++) {
            if(data.filteredData[i].city_latitude && data.filteredData[i].city_longitude) {
              var marker = L.marker([data.filteredData[i].city_latitude, data.filteredData[i].city_longitude]).on('click', function(e) {

                  let dataInClick = data.filteredData.filter(d => d.city_latitude == data.filteredData[i].city_latitude && d.city_longitude == data.filteredData[i].city_longitude);

                  let content = `${ data.text ? data.text[data.lang]["MAP_NB_DATA"] : "" } : ${dataInClick.length} <br/><br/>`;

                  if(dataInClick.length > 0) {
                    content += `${ data.text ? data.text[data.lang]["MAP_CITY"] : "" } : ${dataInClick[0]["city_name"]}<br/><br/>`;
                  }

                  for(let i = 0; i < dataInClick.length; i++) {
                    let infos = `<a href="/detail/${data.filteredData[i].id}" target="_blank">${dataInClick[i]["id_riot_hiscod"]}</a><br/>`;
                    if(data.filteredData[i].title) {
                      infos += data.filteredData[i].title;
                    }

                    content += infos + "<br/><br/>";
                  }

                  setTxtContent(content);

                  setUiDisplay("block");
              });

              markers.addLayer(marker);

              listMarkers.push(marker);
            }
        }

        if(listMarkers.length > 0) {
          var group = new L.featureGroup(listMarkers);
          map.fitBounds(group.getBounds());
        }

        // On affiche le cluster
        map.addLayer(markers);
      }

    }, [data.filteredData, mapType]);

    return (
      <div className="map-div">
        <div id="left-map-ui" style={{ display : uiDisplay }} dangerouslySetInnerHTML={{__html: txtContent}}></div>
        <div id="map" style={{ height: "700px" }}></div>
      </div>
      )

    //return <div id="map" style={{ height: "700px" }}></div>;
}
export default Map
