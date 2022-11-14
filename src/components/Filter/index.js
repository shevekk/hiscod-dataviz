import styled from 'styled-components'
import React, { useState, useContext, useEffect } from "react";
import { Range, getTrackBackground } from 'react-range';
import { DataContext } from '../../providers/data'
import exportInCSV from '../../utils/export'
import RangeCustom from '../RangeCustom'
import { useLocation } from "react-router-dom";

function Filter(props) {

  let location = useLocation();

  // Manage change show/hide
  const [ imgHide, setImgHide ] = useState("../../img/minus-solid.svg");
  const changeImgHide = () => {
    setImgHide(imgHide === "../../img/minus-solid.svg" ? "../../img/plus-solid.svg" : "../../img/minus-solid.svg");
  }

  const { data, setData } = useContext(DataContext);
  let values = [data.filters.min, data.filters.max];

  useEffect(() => {
    setMinCreatorDate(data.minCreatorDateStr);
    setMaxCreatorDate(data.maxCreatorDateStr);
  }, [data.min]);

  // Types
  const types = [...new Set([""].concat(data.data.map(d => d.riot_type_hiscod)))];
  const [selectedType, setSelectedType] = useState("");

  // Sub Types
  const [subTypes, setSubTypes] = useState([...new Set([""].concat(data.data.map(d => d.riot_type_original_database_1)))]);
  const [selectedSubType, setSelectedSubType] = useState("");

  useEffect(() => {
    setSubTypes([...new Set([""].concat(data.data.map(d => d.riot_type_original_database_1)))]);
  }, [data.data]);

  // Change type selected and reload subType
  const onChangeType = (event) => {
    setSelectedType(event.target.value);

    if(event.target.value) {
      setSubTypes([...new Set([""].concat(data.data.filter(d => d.riot_type_hiscod === event.target.value).map(d => d.riot_type_original_database_1)))]);
    }
    else {
      let list = [...new Set([""].concat(data.data.map(d => d.riot_type_original_database_1)))];
      console.log(list);
      setSubTypes(list);
      //setSubTypes([...new Set([""].concat(data.data.map(d => d.riot_type_original_database_1)))]);
    }
  }

  // Change subType selected
  const onChangeSubType = (event) => {
    setSelectedSubType(event.target.value);
  }

  // Country and admin levels
  const countries = [...new Set([""].concat(data.data.map(d => d.country_name)))];
  const [selectedCountry, setSelectedCountry] = useState("");

  const [adminLevel1, setAdminLevel1] = useState([...new Set([""].concat(data.data.map(d => d.admin_level_1)))]);
  const [selectedAdminLevel1, setSelectedAdminLevel1] = useState("");

  const [adminLevel2, setAdminLevel2] = useState([...new Set([""].concat(data.data.map(d => d.admin_level_2)))]);
  const [selectedAdminLevel2, setSelectedAdminLevel2] = useState("");

  const [cityName, setCityName] = useState([...new Set([""].concat(data.data.map(d => d.city_name)))]);
  const [selectedCityName, setSelectedCityName] = useState("");

  // Change country
  const onChangeCountry = (event) => {
    setSelectedCountry(event.target.value);

    setAdminLevel1([...new Set([""].concat(data.data.filter(d => d.country_name === event.target.value).map(d => d.admin_level_1)))]);
    setAdminLevel2([...new Set([""].concat(data.data.filter(d => d.country_name === event.target.value).map(d => d.admin_level_2)))]);
    setCityName([...new Set([""].concat(data.data.filter(d => d.country_name === event.target.value).map(d => d.city_name)))]);
    //setAdminLevel2([]);

    setSelectedAdminLevel1("");
    setSelectedAdminLevel2("");
    setSelectedCityName("");
  }

  // Change Admin Level 1
  const onChangeAdminLevel1 = (event) => {
    setSelectedAdminLevel1(event.target.value);

    setAdminLevel2([...new Set([""].concat(data.data.filter(d => d.admin_level_1 === event.target.value).map(d => d.admin_level_2)))]);
    setCityName([...new Set([""].concat(data.data.filter(d => d.country_name === event.target.value).map(d => d.city_name)))]);

    setSelectedAdminLevel2("");
    setSelectedCityName("");
  }

  // Change Admin Level 2
  const onChangeAdminLevel2 = (event) => {
    setSelectedAdminLevel2(event.target.value);

    setCityName([...new Set([""].concat(data.data.filter(d => d.admin_level_2 === event.target.value).map(d => d.city_name)))]);
    setSelectedCityName("");
  }

  // Change Admin Level 2
  const onChangeCityName = (event) => {
    setSelectedCityName(event.target.value);
  }

  // Country and historical admin levels
  const historicalPoliticalEntity = [...new Set([""].concat(data.data.map(d => d.historical_political_entity)))];
  const [selectedHistoricalPoliticalEntity, setSelectedHistoricalPoliticalEntity] = useState("");

  const [historicalAdminLevel1, sethistoricalAdminLevel1] = useState([...new Set([""].concat(data.data.map(d => d.historical_admin_level_1)))]);
  const [selectedHistoricalAdminLevel1, setSelectedHistoricalAdminLevel1] = useState("");

  const [historicalAdminLevel2, setHistoricalAdminLevel2] = useState([...new Set([""].concat(data.data.map(d => d.historical_admin_level_2)))]);
  const [selectedHistoricalAdminLevel2, setSelectedHistoricalAdminLevel2] = useState("");

  // Change Historical Political Entity
  const onChangeHistoricalPoliticalEntity = (event) => {
    setSelectedHistoricalPoliticalEntity(event.target.value);

    sethistoricalAdminLevel1([...new Set([""].concat(data.data.filter(d => d.historical_political_entity == event.target.value).map(d => d.historical_admin_level_1)))]);
    setHistoricalAdminLevel2([]);

    setSelectedHistoricalAdminLevel1("");
    setSelectedHistoricalAdminLevel2("");
  }

  // Change Historical Admin Level 1
  const onChangeHistoricalAdminLevel1 = (event) => {
    setSelectedHistoricalAdminLevel1(event.target.value);

    setHistoricalAdminLevel2([...new Set([""].concat(data.data.filter(d => d.historical_admin_level_1 == event.target.value).map(d => d.historical_admin_level_2)))]);
    setSelectedHistoricalAdminLevel2("");
  }

  // Change Historical Admin Level 2
  const onChangeHistoricalAdminLevel2 = (event) => {
    setSelectedHistoricalAdminLevel2(event.target.value);
  }



  // Nb participants
  const nbParticipants = ["", "Indéterminé", "0-9", "10-49", "50-99", "100-499", "500-999", "1000 et plus"];
  const [selectedNbParticipants, setSelectedNbParticipants] = useState("");

  // Change Nb Participants
  const onChangeSelectedNbParticipants = (event) => {
    setSelectedNbParticipants(event.target.value);
  }

  // Woman pariticipation
  const womenParticipation = [...new Set([""].concat(data.data.map(d => d.women_participation)))];
  const [selectedWomenParticipation, setSelectedWomenParticipation] = useState("");

  // Change woman pariticipation
  const onChangeSelectedWomenParticipation = (event) => {
    setSelectedWomenParticipation(event.target.value);
  }

  // Author
  const author = [...new Set([""].concat(data.data.map(d => d.author)))];
  const [selectedAuthor, setSelectedAuthor] = useState("");

  // Change author
  const onChangeSelectedAuthor = (event) => {
    setSelectedAuthor(event.target.value);
  }

  // Contributor
  const contributor = [...new Set([""].concat(data.data.map(d => d.contributor)))];
  const [selectedContributor, setSelectedContributor] = useState("");

  // Change contributor
  const onChangeSelectedContributor = (event) => {
    setSelectedContributor(event.target.value);
  }

  // Creator
  const [minCreatorDate, setMinCreatorDate] = useState(data.minCreatorDateStr);
  const [maxCreatorDate, setMaxCreatorDate] = useState(data.maxCreatorDateStr);

  const onChangeMinCreatorDate = (event) => {
    setMinCreatorDate(event.target.value);
  }
  const onChangeMaxCreatorDate = (event) => {
    setMaxCreatorDate(event.target.value);
  }

  // filter data
  const filter = () => {
    let modifyData = {...data};

    modifyData.filteredData = data.data.filter(d => d.year >= values[0] && d.year <= values[1]);
    modifyData["filters"]["min"] = values[0];
    modifyData["filters"]["max"] = values[1];

    // Types filters
    if(selectedType) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.riot_type_hiscod == selectedType);
      modifyData["filters"]["riot_type_hiscod"] = true;
    }
    else {
      modifyData["filters"]["riot_type_hiscod"] = false;
    }
    if(selectedSubType) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.riot_type_original_database_1 == selectedSubType);
      modifyData["filters"]["riot_type_original_database_1"] = true;
    }
    else {
      modifyData["filters"]["riot_type_original_database_1"] = false;
    }

    // Admin filters
    if(selectedCountry) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.country_name == selectedCountry);
      modifyData["filters"]["country_name"] = true;
    }
    else {
      modifyData["filters"]["country_name"] = false;
    }
    if(selectedAdminLevel1) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.admin_level_1 == selectedAdminLevel1);
      modifyData["filters"]["admin_level_1"] = true;
    }
    else {
      modifyData["filters"]["admin_level_1"] = false;
    }
    if(selectedAdminLevel2) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.admin_level_2 == selectedAdminLevel2);
      modifyData["filters"]["admin_level_2"] = true;
    }
    else {
      modifyData["filters"]["admin_level_2"] = false;
    }
    if(selectedCityName) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.city_name == selectedCityName);
      modifyData["filters"]["city_name"] = true;
    }
    else {
      modifyData["filters"]["city_name"] = false;
    }

    // Historical Admin filters
    if(selectedHistoricalPoliticalEntity) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.historical_political_entity == selectedHistoricalPoliticalEntity);
      modifyData["filters"]["historical_political_entity"] = true;
    }
    else {
      modifyData["filters"]["historical_political_entity"] = false;
    }
    if(selectedHistoricalAdminLevel1) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.historical_admin_level_1 == selectedHistoricalAdminLevel1);
      modifyData["filters"]["historical_admin_level_1"] = true;
    }
    else {
      modifyData["filters"]["historical_admin_level_1"] = false;
    }
    if(selectedHistoricalAdminLevel2) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.historical_admin_level_2 === selectedHistoricalAdminLevel2);
      modifyData["filters"]["historical_admin_level_2"] = true;
    }
    else {
      modifyData["filters"]["historical_admin_level_2"] = false;
    }

    // Filter of woman participants
    if(selectedWomenParticipation) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.women_participation === selectedWomenParticipation);
    }

    // Filter of authors
    if(selectedAuthor) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.author === selectedAuthor);
    }

    // Filter of contributors
    if(selectedContributor) {
      modifyData.filteredData = modifyData.filteredData.filter(d => d.contributor === selectedContributor);
    }

    // Filter max et min dates
    if(minCreatorDate && maxCreatorDate) {
      modifyData.filteredData = modifyData.filteredData.filter(d => {
        let dateCreator = new Date(d.date_creation.split('-')[0], parseInt(d.date_creation.split('-')[1]) - 1, d.date_creation.split('-')[2]);
        let dateMin = new Date(minCreatorDate.split('-')[0], parseInt(minCreatorDate.split('-')[1]) - 1, minCreatorDate.split('-')[2]);
        let dateMax = new Date(maxCreatorDate.split('-')[0], parseInt(maxCreatorDate.split('-')[1]) - 1, maxCreatorDate.split('-')[2]);
        if(dateCreator <= dateMax && dateCreator >= dateMin) {
          return true;
        }
        else {
          return false;
        }
      });
    }

    // Filter nb participant
    if(selectedNbParticipants) {

      if(selectedNbParticipants == "Indéterminé") {
        modifyData.filteredData = modifyData.filteredData.filter(d => d.nb_participants === selectedNbParticipants);
      } 
      else if(selectedNbParticipants.split("-").length > 1) {
        let txtSplit = selectedNbParticipants.split("-");
        let startNumber = parseInt(txtSplit[0]);
        let endNumber = parseInt(txtSplit[1]);

        modifyData.filteredData = modifyData.filteredData.filter(d => parseInt(d.nb_participants) >= startNumber && parseInt(d.nb_participants) <= endNumber);
      }
      else {
        modifyData.filteredData = modifyData.filteredData.filter(d => parseInt(d.nb_participants) >= 1000);
      } 
    }

    setData(modifyData);
    return modifyData;
  }

  const changeDateValues = (newValues) => {
    //setValues(newValues);
    values = newValues;
  };

  // Change langue
  const [lang, setLang] = useState("fr");
  useEffect(() => {
    filter();
    setLang(data.lang);
  }, [data.lang]);

  return (
    <div className="filter-div">

    {location.pathname != "/help" ? 

      <div>

        <img src={imgHide} className="filter-hide-button" onClick={changeImgHide} />

        {imgHide == "../../img/minus-solid.svg" ?

          <div>

            <RangeCustom min={data.min} max={data.max} newValues={values} text={data.text ? data.text[data.lang]["FILTER_DATES_VALUES"] : ""} changeDateValues={changeDateValues} />
            
            <div className="filter-div-line-container">
              <label>{data.text ? data.text[data.lang]["FILTER_TYPES"] : ""} : </label>
              <select className="select-type" value={selectedType} onChange={onChangeType} title="riot_type_hiscod">
                {types && types.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>

              <label className="filter-old-name-label">{data.text ? data.text[data.lang]["FILTER_ORIGINAL_TYPES"] : ""} : </label>
              <select className="select-type" value={selectedSubType} onChange={onChangeSubType} title="riot_type_original_database_1">
                {subTypes && subTypes.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
            </div>

            <div className="filter-div-line-container">
              <label>{data.text ? data.text[data.lang]["FILTER_PAYS"] : ""} : </label>
              <select className="select-type" value={selectedCountry} onChange={onChangeCountry} title="country_name">
                {countries && countries.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>

              <select className="select-type" value={selectedAdminLevel1} onChange={onChangeAdminLevel1} title="admin_level_1">
                {adminLevel1 && adminLevel1.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>

              <select className="select-type" value={selectedAdminLevel2} onChange={onChangeAdminLevel2} title="admin_level_2">
                {adminLevel2 && adminLevel2.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>

              <select className="select-type" value={selectedCityName} onChange={onChangeCityName} title="city_name">
                {cityName && cityName.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
            </div>

            <div className="filter-div-line-container">
              <label>{data.text ? data.text[data.lang]["FILTER_HISTORICAL_COUNTRY"] : ""} : </label>
              <select className="select-type" value={selectedHistoricalPoliticalEntity} onChange={onChangeHistoricalPoliticalEntity} title="historical_political_entity">
                {historicalPoliticalEntity && historicalPoliticalEntity.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>

              <select className="select-type" value={selectedHistoricalAdminLevel1} onChange={onChangeHistoricalAdminLevel1} title="historical_admin_level_1">
                {historicalAdminLevel1 && historicalAdminLevel1.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>

              <select className="select-type" value={selectedHistoricalAdminLevel2} onChange={onChangeHistoricalAdminLevel2} title="historical_admin_level_2">
                {historicalAdminLevel2 && historicalAdminLevel2.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
            </div>

            <div className="filter-div-line-container">
              <label>{data.text ? data.text[data.lang]["FILTER_PARTICIPANTS"] : ""} : </label>
              <select className="select-type" value={selectedNbParticipants} onChange={onChangeSelectedNbParticipants} title="nb_participants">
                {nbParticipants && nbParticipants.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>

              <label>{data.text ? data.text[data.lang]["FILTER_WOMAN"] : ""} : </label>
              <select className="select-type" value={selectedWomenParticipation} onChange={onChangeSelectedWomenParticipation} title="women_participation">
                {womenParticipation && womenParticipation.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
            </div>

            <div className="filter-div-line-container">
              <label>{data.text ? data.text[data.lang]["FILTER_AUTHOR"] : ""} : </label>
              <select className="select-type" value={selectedAuthor} onChange={onChangeSelectedAuthor} title="author">
                {author && author.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>

              <label>{data.text ? data.text[data.lang]["FILTER_CONTRIBUTOR"] : ""} : </label>
              <select className="select-type" value={selectedContributor} onChange={onChangeSelectedContributor} title="contributor">
                {contributor && contributor.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>

              <label>{data.text ? data.text[data.lang]["FILTER_CREATION_MIN"] : ""} : </label>
              <input type="date" value={minCreatorDate} onChange={onChangeMinCreatorDate} title="date_creation min"/>
              <label> {data.text ? data.text[data.lang]["FILTER_CREATION_MAX"] : ""} : </label>
              <input type="date" value={maxCreatorDate} onChange={onChangeMaxCreatorDate} title="date_creation max"/>
            </div>

            <div className="top-button-div">
              <button className="filter-button top-button" onClick={() => filter()} title={data.text ? data.text[data.lang]["FILTER_FILTER_DESC"] : ""} >{data.text ? data.text[data.lang]["FILTER_FILTER"] : ""}</button>
              <button className="export-button top-button" onClick={() => {let modifyData = filter(); exportInCSV(modifyData.filteredData, modifyData.headers)}} title={data.text ? data.text[data.lang]["FILTER_EXPORT_CSV_DESC"] : ""} >{data.text ? data.text[data.lang]["FILTER_EXPORT_CSV"] : ""}</button>
            </div>

            <p className="table-nb-elements">{data.text ? data.text[data.lang]["FILTER_DATA_NUMBERS"] : ""} : {data.filteredData.length}</p>

           </div>
           : "" }
        </div>
       : ""}
    </div>
  )
}

export default Filter
