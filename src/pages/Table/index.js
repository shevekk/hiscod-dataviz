import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../providers/data'
import { TableWithBrowserPagination, Column } from 'react-rainbow-components';
import { Link } from 'react-router-dom'

const DetailLink = ({ value, text }) => {
  return <Link to={`/detail/${value}`} className="table-details-link">{ text }</Link>;
};

const HiscodLink = ({ value, text, lang }) => {
  let hiscodUrl = `https://www.unicaen.fr/hiscod/fr/espagne/conflits_sociaux53.xml/${value}${lang}.html`;
  return <a href={hiscodUrl} target="_blank" rel="noreferrer" className="table-details-link">{ text }</a>;
};

/* Create display table */
function Table() {

  const { data } = useContext(DataContext)

  //let listeCols = {};
  const [listCols, setListCols] = useState({});

  const [lang, setLang] = useState("fr");
  useEffect(() => {
    setLang(data.lang);

    let newListCols = {};

    if(data.lang === "fr")
    {
      newListCols["id"] = "Id";
      newListCols["id_riot_hiscod"] = "id riot hiscod";
      newListCols["id_riot_original_database"] = "id_riot_original_database";
      newListCols["title"] = "Titre";
      newListCols["year"] = "Années";
      newListCols["month_num"] = "Num mois";
      newListCols["month"] = "Mois";
      newListCols["day"] = "Jour";
      newListCols["day_week"] = "Jour de la semaine";
      newListCols["riot_date"] = "Date revolte";
      newListCols["riot_type_hiscod_num"] = "riot_type_hiscod_num";
      newListCols["riot_type_hiscod"] = "Type hiscod";
      newListCols["riot_type_original_database_1"] = "riot type original database 1";
      newListCols["riot_type_original_database_2"] = "riot type original database 2";
      newListCols["riot_type_original_database_3"] = "riot type original database 3";
      newListCols["nb_participants"] = "nb participants";
      newListCols["women_participation"] = "women_participation";
      newListCols["city_source"] = "city_source";
      newListCols["city_name"] = "city name";
      newListCols["city_code"] = "city_code";
      newListCols["city_latitude"] = "city_latitude";
      newListCols["city_longitude"] = "city_longitude";
      newListCols["geo_precision"] = "geo_precision";
      newListCols["country_name"] = "country_name";
      newListCols["admin_level_1_type"] = "admin_level_1_type";
      newListCols["admin_level_1"] = "admin_level_1";
      newListCols["admin_level_2_type"] = "admin_level_2_type";
      newListCols["admin_level_2"] = "admin_level_2";
      newListCols["country_name"] = "country_name";
      newListCols["code_insee_pre_2016"] = "code_insee_pre_2016";
      newListCols["historical_political_entity"] = "historical political entity";

      newListCols["historical_admin_level_1_type"] = "historical_admin_level_1_type";
      newListCols["historical_admin_level_1"] = "historical_admin_level_1";
      newListCols["historical_admin_level_2_type"] = "historical_admin_level_2_type";
      newListCols["historical_admin_level_2"] = "historical_admin_level_2";
      newListCols["description_event"] = "description_event";
      newListCols["description_event_english"] = "description_event_english";
      newListCols["primary_sources_1"] = "primary_sources_1";
      newListCols["url_1"] = "url_1";
      newListCols["primary_sources_2"] = "primary_sources_2";
      newListCols["url_2"] = "url_2";
      newListCols["primary_sources_3"] = "primary_sources_3";
      newListCols["url_3"] = "url_3";
      newListCols["primary_sources_4"] = "primary_sources_4";
      newListCols["url_4"] = "url_4";
      newListCols["primary_sources_5"] = "primary_sources_5";
      newListCols["url_5"] = "url_5";
      newListCols["primary_sources_6"] = "primary_sources_6";
      newListCols["url_6"] = "url_6";
      newListCols["primary_sources_7"] = "primary_sources_7";
      newListCols["url_7"] = "url_7";
      newListCols["primary_sources_8"] = "primary_sources_8";
      newListCols["url_8"] = "url_8";
      newListCols["primary_sources_9"] = "primary_sources_9";
      newListCols["url_9"] = "url_9";
      newListCols["primary_sources_10"] = "primary_sources_10";
      newListCols["url_10"] = "url_10";

      newListCols["bibliography_1"] = "bibliography_1";
      newListCols["pages_1"] = "pages_1";
      newListCols["bibliography_2"] = "bibliography_2";
      newListCols["pages_2"] = "pages_2";
      newListCols["bibliography_3"] = "bibliography_3";
      newListCols["pages_3"] = "pages_3";

      newListCols["comments"] = "comments";
      newListCols["author"] = "author";
      newListCols["contributor"] = "contributor";
      newListCols["date_creation"] = "date_creation";
      newListCols["date_edition"] = "date_edition";
    }
    else
    {
      newListCols["id"] = "Id";
      newListCols["id_riot_hiscod"] = "id riot hiscod";
      newListCols["id_riot_original_database"] = "id_riot_original_database";
      newListCols["title"] = "Title";
      newListCols["year"] = "Années";
      newListCols["month_num"] = "Month num";
      newListCols["month"] = "Month";
      newListCols["day"] = "Day";
      newListCols["day_week"] = "Day week";
      newListCols["riot_date"] = "Riot date";
      newListCols["riot_type_hiscod_num"] = "riot_type_hiscod_num";
      newListCols["riot_type_hiscod"] = "Type hiscod";
      newListCols["riot_type_original_database_1"] = "riot type original database 1";
      newListCols["riot_type_original_database_2"] = "riot type original database 2";
      newListCols["riot_type_original_database_3"] = "riot type original database 3";
      newListCols["nb_participants"] = "nb participants";
      newListCols["women_participation"] = "women_participation";
      newListCols["city_source"] = "city_source";
      newListCols["city_name"] = "city name";
      newListCols["city_code"] = "city_code";
      newListCols["city_latitude"] = "city_latitude";
      newListCols["city_longitude"] = "city_longitude";
      newListCols["geo_precision"] = "geo_precision";
      newListCols["country_name"] = "country_name";
      newListCols["admin_level_1_type"] = "admin_level_1_type";
      newListCols["admin_level_1"] = "admin_level_1";
      newListCols["admin_level_2_type"] = "admin_level_2_type";
      newListCols["admin_level_2"] = "admin_level_2";
      newListCols["country_name"] = "country_name";
      newListCols["code_insee_pre_2016"] = "code_insee_pre_2016";
      newListCols["historical_political_entity"] = "historical political entity";

      newListCols["historical_admin_level_1_type"] = "historical_admin_level_1_type";
      newListCols["historical_admin_level_1"] = "historical_admin_level_1";
      newListCols["historical_admin_level_2_type"] = "historical_admin_level_2_type";
      newListCols["historical_admin_level_2"] = "historical_admin_level_2";
      newListCols["description_event"] = "description_event";
      newListCols["description_event_english"] = "description_event_english";
      newListCols["primary_sources_1"] = "primary_sources_1";
      newListCols["url_1"] = "url_1";
      newListCols["primary_sources_2"] = "primary_sources_2";
      newListCols["url_2"] = "url_2";
      newListCols["primary_sources_3"] = "primary_sources_3";
      newListCols["url_3"] = "url_3";
      newListCols["primary_sources_4"] = "primary_sources_4";
      newListCols["url_4"] = "url_4";
      newListCols["primary_sources_5"] = "primary_sources_5";
      newListCols["url_5"] = "url_5";
      newListCols["primary_sources_6"] = "primary_sources_6";
      newListCols["url_6"] = "url_6";
      newListCols["primary_sources_7"] = "primary_sources_7";
      newListCols["url_7"] = "url_7";
      newListCols["primary_sources_8"] = "primary_sources_8";
      newListCols["url_8"] = "url_8";
      newListCols["primary_sources_9"] = "primary_sources_9";
      newListCols["url_9"] = "url_9";
      newListCols["primary_sources_10"] = "primary_sources_10";
      newListCols["url_10"] = "url_10";

      newListCols["bibliography_1"] = "bibliography_1";
      newListCols["pages_1"] = "pages_1";
      newListCols["bibliography_2"] = "bibliography_2";
      newListCols["pages_2"] = "pages_2";
      newListCols["bibliography_3"] = "bibliography_3";
      newListCols["pages_3"] = "pages_3";

      newListCols["comments"] = "comments";
      newListCols["author"] = "author";
      newListCols["contributor"] = "contributor";
      newListCols["date_creation"] = "date_creation";
      newListCols["date_edition"] = "date_edition";
    }

    setListCols(newListCols);

  }, [data.lang]);

  let displayColDefault = ["id", "id_riot_hiscod", "title", "riot_date", "riot_type_hiscod", "city_name", "historical_political_entity", "riot_type_hiscod"];
  let displayColValues = displayColDefault;
  if(window.localStorage.getItem('hiscod_table_cols')) {
    displayColValues = window.localStorage.getItem('hiscod_table_cols').split(",");
  }

  const [displayCol, setDisplayCol] = useState(displayColValues);

  const [displayAddColSelect, setDisplayAddColSelect] = useState("none");
  const [displayAddColButton, setDisplayAddColButton] = useState("inline-block");

  const [valueAddCol, setValueAddCol] = useState("id");

  // Remove a column
  const removeCol = (col) => {
    setDisplayCol(displayCol.filter(function(value, index, arr){ 
        return value !== col;
    }));
  };

  // Click to add column button
  const addColSelect = () => {
    setDisplayAddColSelect("inline-block");
    setDisplayAddColButton("none");
  };

  // Click on "OK" for add a column
  const addACol = () => {
    setDisplayAddColSelect("none");
    setDisplayAddColButton("inline-block");

    setDisplayCol(displayCol.concat(valueAddCol));
  };

  // Change the value of add col
  const changeValueAddCol = (event) => {
    if(event) {
      setValueAddCol(event.target.value);
    }
  };

  // Save column to local storage
  const saveCols = () => {
    window.localStorage.setItem('hiscod_table_cols', displayCol);

    alert("Choix des colonnes sauvegardé");
  };

  // Re-Init the cols list with default values
  const reinitCols = () => {
    setDisplayCol(displayColDefault);
  };

  // 
  const [filterData, setFilterData] = useState(data.filteredData);
  let minDate = data.filters.min + "-01-01";
  let maxDate = data.filters.max + "-12-31";
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  // Search select (col)
  const [searchSelect, setSearchSelect] = useState("title");
  const changeSearchSelect = (event) => {
    if(event) {
      setSearchSelect(event.target.value);
    }
  };

  // Search text
  const [searchText, setSearchText] = useState("");
  const changeSearchText = (event) => {
    if(event) {
      setSearchText(event.target.value);
    }
  };

  // Update data with filter
  useEffect(() => {
    setFilterData(data.filteredData);

    setStartDate(minDate);
    setEndDate(maxDate);
  }, [data.filteredData, minDate, maxDate]);

  // Change the start date
  const changeStartDate = (event) => {
    if(event) {
      setStartDate(event.target.value);
    }
  };

  // Change the end date
  const changeEndDate = (event) => {
    if(event) {
      setEndDate(event.target.value);
    }
  };

  // 
  let colArray = [];
  Object.keys(listCols).map(function(key)
    {
      colArray.push({});
      colArray[colArray.length - 1]["key"] = key;
      colArray[colArray.length - 1]["name"] = listCols[key];
      return null;
    }
  )

  // Filter table datas with dates and text search
  const filterDate = () => {

    let filterDataNew = data.filteredData;

    let startYear = parseInt(startDate.split("-")[0]);
    let startMonth = parseInt(startDate.split("-")[1]);
    let startDay = parseInt(startDate.split("-")[2]);

    let endYear = parseInt(endDate.split("-")[0]);
    let endMonth = parseInt(endDate.split("-")[1]);
    let endDay = parseInt(endDate.split("-")[2]);

    if(startYear === endYear) {
      if(startMonth=== 1 && startDay === 1 && endMonth === 12 && endDay ===31) {
        filterDataNew = filterDataNew.filter(d => d.year ===startYear);
      }
      else if(startMonth === 1 && startDay === 1) {
        filterDataNew = filterDataNew.filter(d => new Date(d.year, d.month_num - 1, d.day) <= new Date(endYear, endMonth - 1, endDay));
      }
      else if(endMonth === 12 && endDay === 31) {
        filterDataNew = filterDataNew.filter(d => new Date(d.year, d.month_num - 1, d.day) >= new Date(startYear, startMonth - 1, startDay));      
      }
      else {
        filterDataNew = filterDataNew.filter(d => new Date(d.year, d.month_num - 1, d.day) >= new Date(startYear, startMonth - 1, startDay) && new Date(d.year, d.month_num - 1, d.day) <= new Date(endYear, endMonth - 1, endDay));
      }
    }
    else {
      let firstDataNew = filterDataNew.filter(d => d.year === startYear && new Date(d.year, d.month_num - 1, d.day) >= new Date(startYear, startMonth - 1, startDay));
      let secondDataNew = filterDataNew.filter(d => d.year > startYear && d.year < endYear);
      let thirdDataNew = filterDataNew.filter(d => d.year === endYear && new Date(d.year, d.month_num - 1, d.day) <= new Date(endYear, endMonth - 1, endDay));
      filterDataNew = firstDataNew.concat(secondDataNew, thirdDataNew);
    }

    if(searchText) {
      filterDataNew = filterDataNew.filter(d => d[searchSelect] && d[searchSelect].includes(searchText));
    }

    setFilterData(filterDataNew);
  }

  return (
    <div>
      <div className="table-dates-main-div">
        <div className="table-date-div">
          <label>{ data.text ? data.text[data.lang]["TABLE_START_DATE"] : "" }</label>
          <input type="date" value={startDate} min={minDate} max={maxDate} onChange={changeStartDate} />
        </div>
        <div className="table-date-div">
          <label>{ data.text ? data.text[data.lang]["TABLE_END_DATE"] : "" }</label>
          <input type="date" value={endDate} min={minDate} max={maxDate} onChange={changeEndDate} />
        </div>
        <div className="table-search-text-div">
          <label>{ data.text ? data.text[data.lang]["TABLE_SEARCH"] : "" }</label>
          <input type="text" value={searchText} onChange={changeSearchText} />
        </div>
        <div className="table-search-select-div">
          <select id="table-search-select" value={searchSelect} onChange={changeSearchSelect} >
            <option value="title">{ data.text ? data.text[data.lang]["TABLE_SELECT_COL_TITLE"] : "" }</option>
            <option value="description_event">{ data.text ? data.text[data.lang]["TABLE_SELECT_COL_DESCR_FR"] : "" }</option>
            <option value="description_event_english">{ data.text ? data.text[data.lang]["TABLE_SELECT_COL_DESCR_EN"] : "" }</option>
          </select>
        </div>
        <button onClick={() => filterDate()}>{ data.text ? data.text[data.lang]["FILTER_FILTER"] : "" }</button>
        <div className="table-search-nb-datas">{ data.text ? data.text[data.lang]["FILTER_DATA_NUMBERS"] : "" } : {filterData.length}</div>
      </div>

      <div className="table-col-div">
        {displayCol && displayCol.map((col) => (
            <div className="table-col-element">{listCols[col]} ({col}) <img className="table-col-img-delete" alt="delete" src="../../img/square-minus-regular.svg" onClick={() => removeCol(col)} /></div>
        ))}

        <div style={{display: displayAddColSelect}} className="table-col-div-add" >
          <select id="table-col-select-add" value={valueAddCol} onChange={changeValueAddCol} >
            {colArray.map(col => (
              <option value={col["key"] }>{col["name"]}</option>
            ))}
          </select>
          <button onClick={() => addACol()}>OK</button>
        </div>

        <img style={{display: displayAddColButton}} className="table-col-img-add" alt="add" src="../../img/plus-solid.svg" onClick={() => addColSelect()} title={ data.text ? data.text[data.lang]["TABLE_ADD_COLS"] : "" } />
      
        <button className="table-col-save-button" onClick={() => saveCols()}>{ data.text ? data.text[data.lang]["TABLE_COLS_SAVE"] : "" }</button>

        <button className="table-col-save-button" onClick={() => reinitCols()}>{ data.text ? data.text[data.lang]["TABLE_COLS_REINIT"] : "" }</button>
      </div>

      <div className="table-div">
        <div className="rainbow-m-bottom_xx-large">
          <TableWithBrowserPagination pageSize={30} data={filterData} keyField="id">

              {displayCol && displayCol.map((col) => (
                  <Column field={col} header={listCols[col]} />
              ))}

              <Column field="id" header="Détails" text={ data.text ? data.text[data.lang]["TABLE_LINK_DETAILS"] : "" } component={DetailLink} />
              <Column field="id_riot_hiscod" header="Hiscod" text={ data.text ? data.text[data.lang]["TABLE_LINK_HISCOD"] : "" } lang={lang} component={HiscodLink} />
          </TableWithBrowserPagination>
        </div>
      </div>
    </div>
  )
}
export default Table
