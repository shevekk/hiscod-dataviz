import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import Papa from "papaparse";
import { selectData } from './../../utils/selectors'
import { DataContext } from '../../providers/data'
import { Link, useLocation } from 'react-router-dom'
import LangSelection from './../../components/LangSelection'
import DictionaryFr from "./../../dictionary/dictionary_fr.json";
import DictionaryEn from "./../../dictionary/dictionary_en.json";

import csvFileFR from './../../data/db_hiscod_csv_v1_fr.csv';
import csvFileEN from './../../data/db_hiscod_csv_v1_en.csv';

function Header() {

  const { data, setData } = useContext(DataContext);
  useEffect(() => {

    let langInit = "fr";
    if(window.localStorage.getItem('hiscod_lang')) {
      langInit = window.localStorage.getItem('hiscod_lang');
    }

    // Load FR data
    Papa.parse(csvFileFR, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function(resultsFR) {
          // Load EN data
          Papa.parse(csvFileEN, {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function(resultsEN) {

              // Create data obj
              let dataObj = {
                datas : [],
                data : resultsFR.data,
                min : 1500,
                max : 1600,
                minCreatorDate : new Date(),
                maxCreatorDate : new Date(1900),
                minCreatorDateStr : "",
                maxCreatorDateStr : "",
                minEditorDate : new Date(),
                maxEditorDate : new Date(1900),
                minEditorDateStr : "",
                maxEditorDateStr : "",
                filteredData : resultsFR.data,
                headers : resultsFR.meta.fields,
                filters : {min : 1500, max : 1600, typeFiltered : false, subTypeFiltered : false},
                lang : "fr",
                text : {},
              }

              // Data langue array
              dataObj.datas["fr"] = resultsFR.data;
              dataObj.datas["en"] = resultsEN.data;

              dataObj.data = dataObj.datas[langInit];
              
              // Get dates min and max
              resultsFR.data.map((d) => {
                if(d.year) {
                  if(d.year < dataObj.min) {
                    dataObj.min = d.year;
                  }
                  else if(d.year > dataObj.max) {
                    dataObj.max = d.year;
                  }
                }
              });

              // Get creator dates min and max
              resultsFR.data.map((d) => {
                if(d.date_creation) {
                  let creatorDate = new Date(d.date_creation.split('-')[0], parseInt(d.date_creation.split('-')[1]) - 1, d.date_creation.split('-')[2]);
                  if(creatorDate < dataObj.minCreatorDate) {
                    dataObj.minCreatorDate = creatorDate;
                    dataObj.minCreatorDateStr = d.date_creation;
                  }
                  else if(creatorDate > dataObj.maxCreatorDate) {
                    dataObj.maxCreatorDate = creatorDate;
                    dataObj.maxCreatorDateStr = d.date_creation;
                  }
                }
              });

              // Get editor dates min and max
              resultsFR.data.map((d) => {
                if(d.date_edition) {
                  let editorDate = new Date(d.date_creation.split('-')[0], parseInt(d.date_creation.split('-')[1]) - 1, d.date_creation.split('-')[2]);
                  if(editorDate < dataObj.minEditorDate) {
                    dataObj.minEditorDate = editorDate;
                    dataObj.minEditorDateStr = d.date_edition;
                  }
                  else if(editorDate > dataObj.maxEditorDate) {
                    dataObj.maxEditorDate = editorDate;
                    dataObj.maxEditorDateStr = d.date_edition;
                  }
                }
              });

              // Get participants value FR
              let nbParticipantsList = [[0, 9], [10, 49], [50, 99], [100, 499], [500, 999], [1000]];
              resultsFR.data.map((d) => {
                if(d.nb_participants === "Indéterminé") {
                  d["nb_participants_number"] = "";
                }
                else {
                  let selectedParticipants = "";
                  for(let i = 0; i < nbParticipantsList.length; i++) {
                    if(nbParticipantsList[i].length === 1) {
                      if(parseInt(d.nb_participants) >= nbParticipantsList[i][0]) {
                        selectedParticipants = "> " + nbParticipantsList[i][0];
                      }
                    }
                    else {
                      if(parseInt(d.nb_participants) >= nbParticipantsList[i][0] && parseInt(d.nb_participants) <= nbParticipantsList[i][1]) {
                        selectedParticipants = nbParticipantsList[i][0] + " - " + nbParticipantsList[i][1];
                      }
                    }
                  }
                  d["nb_participants_number"] = selectedParticipants;
                }
              });

              // Get participants value
              resultsEN.data.map((d) => {
                if(d.nb_participants === "Indéterminé") {
                  d["nb_participants_number"] = "";
                }
                else {
                  let selectedParticipants = "";
                  for(let i = 0; i < nbParticipantsList.length; i++) {
                    if(nbParticipantsList[i].length === 1) {
                      if(parseInt(d.nb_participants) >= nbParticipantsList[i][0]) {
                        selectedParticipants = "> " + nbParticipantsList[i][0];
                      }
                    }
                    else {
                      if(parseInt(d.nb_participants) >= nbParticipantsList[i][0] && parseInt(d.nb_participants) <= nbParticipantsList[i][1]) {
                        selectedParticipants = nbParticipantsList[i][0] + " - " + nbParticipantsList[i][1];
                      }
                    }
                  }
                  d["nb_participants_number"] = selectedParticipants;
                }
              });

              dataObj["filters"]["min"] = dataObj.min;
              dataObj["filters"]["max"] = dataObj.max;

              // Add lang content
              dataObj["text"]["fr"] = DictionaryFr;
              dataObj["text"]["en"] = DictionaryEn;

              setData(dataObj);

            }
          });
        }
    });
  }, []);

  const location = useLocation();
  const pathname = location.pathname;

  const [lang, setLang] = useState("fr");
  useEffect(() => {
    setLang(data.lang);
  }, [data.lang]);

  return (
    <header className="header">
      <h2 className="header-title">HiSCoD</h2>
      <LangSelection />
      <div>
        <Link className={`header-link ${pathname === "/" ? "active" : ""}`} to={`/`}>{ data.text ? data.text[data.lang]["HEADER_TABLE"] : "" }</Link>
        <Link className={`header-link ${pathname.includes("/map") ? "active" : ""}`} to={`/map/normal`}>{ data.text ? data.text[data.lang]["HEADER_MAP"] : "" }</Link>
        <Link className={`header-link ${pathname.includes("/events") ? "active" : ""}`} to={`/events/lines/1`}>{ data.text ? data.text[data.lang]["HEADER_EVENTS"] : "" }</Link>
        <Link className={`header-link ${pathname.includes("/types") ? "active" : ""}`} to={`/types/pie/0`}>{ data.text ? data.text[data.lang]["HEADER_TYPES"] : "" }</Link>
        <Link className={`header-link ${pathname.includes("/admin") ? "active" : ""}`} to={`/admin/pie/0`}>{ data.text ? data.text[data.lang]["HEADER_ADMINISTRATION"] : "" }</Link>
        <Link className={`header-link ${pathname.includes("/historical_admin") ? "active" : ""}`} to={`/historical_admin/pie/0`}>{ data.text ? data.text[data.lang]["HEADER_HISTO_ADMINISTRATION"] : "" }</Link>
        <Link className={`header-link ${pathname.includes("/participants/") ? "active" : ""}`} to={`/participants/pie/0`}>{ data.text ? data.text[data.lang]["HEADER_PARTICIPANTS"] : "" }</Link>
        <Link className={`header-link ${pathname.includes("/heatmap") ? "active" : ""}`} to={`/heatmap/month`}>{ data.text ? data.text[data.lang]["HEADER_HEATMAP"] : "" }</Link>
        <Link className={`header-link ${pathname.includes("/help") ? "active" : ""}`} to={`/help`}>{ data.text ? data.text[data.lang]["HEADER_HELP"] : "" }</Link>
      </div>
      <div>
        {pathname.includes("/map") ? <Link className={`header-link ${pathname.includes("/map/normal") ? "active" : ""}`} to={`/map/normal`}>{ data.text ? data.text[data.lang]["HEADER_MAP_NORMAL"] : "" }</Link> : ''}
        {pathname.includes("/map") ? <Link className={`header-link ${pathname.includes("/map/hex") ? "active" : ""}`} to={`/map/hex`}>{ data.text ? data.text[data.lang]["HEADER_MAP_HEXA"] : "" }</Link> : ''}

        {pathname.includes("/events") ? <Link className={`header-link ${pathname.includes("/events/lines") ? "active" : ""}`} to={`/events/lines/1`}>{ data.text ? data.text[data.lang]["HEADER_LINES"] : "" }</Link> : ''}
        {pathname.includes("/events") ? <Link className={`header-link ${pathname.includes("/events/bars") ? "active" : ""}`} to={`/events/bars/10`}>{ data.text ? data.text[data.lang]["HEADER_BARS"] : "" }</Link> : ''}

        {pathname.includes("/types") ? <Link className={`header-link ${pathname.includes("/types/pie") ? "active" : ""}`} to={`/types/pie/0`}>{ data.text ? data.text[data.lang]["HEADER_PIE"] : "" }</Link> : ''}
        {pathname.includes("/types") ? <Link className={`header-link ${pathname.includes("/types/bars") ? "active" : ""}`} to={`/types/bars/25`}>{ data.text ? data.text[data.lang]["HEADER_BARS"] : "" }</Link> : ''}
        {pathname.includes("/types") ? <Link className={`header-link ${pathname.includes("/types/lines") ? "active" : ""}`} to={`/types/lines/25`}>{ data.text ? data.text[data.lang]["HEADER_LINES"] : "" }</Link> : ''}

        {pathname.includes("/admin") ? <Link className={`header-link ${pathname.includes("/admin/pie") ? "active" : ""}`} to={`/admin/pie/0`}>{ data.text ? data.text[data.lang]["HEADER_PIE"] : "" }</Link> : ''}
        {pathname.includes("/admin") ? <Link className={`header-link ${pathname.includes("/admin/bars") ? "active" : ""}`} to={`/admin/bars/25`}>{ data.text ? data.text[data.lang]["HEADER_BARS"] : "" }</Link> : ''}
        {pathname.includes("/admin") ? <Link className={`header-link ${pathname.includes("/admin/lines") ? "active" : ""}`} to={`/admin/lines/25`}>{ data.text ? data.text[data.lang]["HEADER_LINES"] : "" }</Link> : ''}

        {pathname.includes("/participants") ? <Link className={`header-link ${pathname.includes("/participants/pie") ? "active" : ""}`} to={`/participants/pie/0`}>{ data.text ? data.text[data.lang]["HEADER_PIE"] : "" }</Link> : ''}
        {pathname.includes("/participants") ? <Link className={`header-link ${pathname.includes("/participants/bars") ? "active" : ""}`} to={`/participants/bars/25`}>{ data.text ? data.text[data.lang]["HEADER_BARS"] : "" }</Link> : ''}
        {pathname.includes("/participants") ? <Link className={`header-link ${pathname.includes("/participants/lines") ? "active" : ""}`} to={`/participants/lines/25`}>{ data.text ? data.text[data.lang]["HEADER_LINES"] : "" }</Link> : ''}

        {pathname.includes("/historical_admin") ? <Link className={`header-link ${pathname.includes("/historical_admin/pie") ? "active" : ""}`} to={`/historical_admin/pie/0`}>{ data.text ? data.text[data.lang]["HEADER_PIE"] : "" }</Link> : ''}
        {pathname.includes("/historical_admin") ? <Link className={`header-link ${pathname.includes("/historical_admin/bars") ? "active" : ""}`} to={`/historical_admin/bars/25`}>{ data.text ? data.text[data.lang]["HEADER_BARS"] : "" }</Link> : ''}
        {pathname.includes("/historical_admin") ? <Link className={`header-link ${pathname.includes("/historical_admin/lines") ? "active" : ""}`} to={`/historical_admin/lines/25`}>{ data.text ? data.text[data.lang]["HEADER_LINES"] : "" }</Link> : ''}

        {pathname.includes("/heatmap") ? <Link className={`header-link ${pathname.includes("/heatmap/years") ? "active" : ""}`} to={`/heatmap/years`}>{ data.text ? data.text[data.lang]["HEADER_YEARS"] : "" }</Link> : ''}
        {pathname.includes("/heatmap") ? <Link className={`header-link ${pathname.includes("/heatmap/month") ? "active" : ""}`} to={`/heatmap/month`}>{ data.text ? data.text[data.lang]["HEADER_MONTHS"] : "" }</Link> : ''}
        {pathname.includes("/heatmap") ? <Link className={`header-link ${pathname.includes("/heatmap/days") && !pathname.includes("/heatmap/daysOfWeek") ? "active" : ""}`} to={`/heatmap/days`}>{ data.text ? data.text[data.lang]["HEADER_DAYS"] : "" }</Link> : ''}
        {pathname.includes("/heatmap") ? <Link className={`header-link ${pathname.includes("/heatmap/daysOfWeek") ? "active" : ""}`} to={`/heatmap/daysOfWeek`}>{ data.text ? data.text[data.lang]["HEADER_WEEK_DAYS"] : "" }</Link> : ''}
      </div>
      <div>
        {pathname.includes("/types/lines") || pathname.includes("/admin/lines") || pathname.includes("/historical_admin/lines") || pathname.includes("/participants/lines") || pathname.includes("/events/lines") ? 
          <div>
            <Link className={`header-link ${pathname.endsWith("/days") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/days`}>{ data.text ? data.text[data.lang]["HEADER_DAYS"] : "" }</Link> 
            <Link className={`header-link ${pathname.endsWith("/month") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/month`}>{ data.text ? data.text[data.lang]["HEADER_MONTHS"] : "" }</Link>
            <Link className={`header-link ${pathname.endsWith("/1") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/1`}>1</Link> 
            <Link className={`header-link ${pathname.endsWith("/5") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/5`}>5</Link> 
            <Link className={`header-link ${pathname.endsWith("/10") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/10`}>10</Link> 
            <Link className={`header-link ${pathname.endsWith("/25") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/25`}>25</Link> 
            <Link className={`header-link ${pathname.endsWith("/50") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/50`}>50</Link> 
            <Link className={`header-link ${pathname.endsWith("/100") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/100`}>100</Link> 
          </div>
          : ""
        }
        {pathname.includes("/types/bars") || pathname.includes("/admin/bars") || pathname.includes("/historical_admin/bars") || pathname.includes("/participants/bars") || pathname.includes("/events/bars") ? 
          <div>
            <Link className={`header-link ${pathname.endsWith("/1") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/1`}>1</Link> 
            <Link className={`header-link ${pathname.endsWith("/5") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/5`}>5</Link> 
            <Link className={`header-link ${pathname.endsWith("/10") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/10`}>10</Link> 
            <Link className={`header-link ${pathname.endsWith("/25") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/25`}>25</Link> 
            <Link className={`header-link ${pathname.endsWith("/50") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/50`}>50</Link> 
            <Link className={`header-link ${pathname.endsWith("/100") ? "active" : ""}`} to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/100`}>100</Link> 
          </div>
          : ""
        }
      </div>
    </header>
  )
}

export default Header
