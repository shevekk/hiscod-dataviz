import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { selectData } from './../../utils/selectors'
import { DataContext } from '../../providers/data'

function LangSelection() {

  const LangContainer = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  margin-top : 0px;
  margin-bottom : 0px;
  padding-top : 0px;
  padding-bottom : 0px;
  `

  const { data, setData } = useContext(DataContext);

  // Change the lang 
  const changeLang = () => {
    let lang = data.lang;
    if(lang === "fr") {
      lang = "en";
    }
    else {
      lang = "fr";
    }

    window.localStorage.setItem('hiscod_lang', lang);

    let modifyData = {...data};
    modifyData.lang = lang;
    modifyData.data = modifyData.datas[lang];
    setData(modifyData);
  }

  return (
    <LangContainer>
      <img className="lang-change lang-change-left" src="../../img/angle-left-solid.svg" onClick={changeLang} />
      <p className="lang-change-text">{ data.text ? data.text[data.lang]["LANG"] : "" }</p>
      <img className="lang-change lang-change-right" src="../../img/angle-right-solid.svg" onClick={changeLang} />
    </LangContainer>
  )
}

export default LangSelection