import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/data'
import styled from 'styled-components'
function Footer() {

  const { data, setData } = useContext(DataContext);
  const [lang, setLang] = useState("fr");
  useEffect(() => {
    setLang(data.lang);
  }, [data.lang]);

  return (
    <footer>
      <p className="footer-text">Chambru, Cédric and Maneuvrier-Hervieu, Paul (2022). Introducing HiSCoD: A New Gateway for the Study of Historical Social Conflict. Working paper series Department of Economics 407, University of Zurich. DOI: 10.5167/uzh-217109.</p>
      <a className="footer-link" href="https://www.unicaen.fr/hiscod/accueil.html" target="_blank">{ data.text ? data.text[data.lang]["FOOTER_HISCOD_SITE"] : "" }</a>
      <a className="footer-link" href="https://github.com/hiscod/hiscod-project" target="_blank">{ data.text ? data.text[data.lang]["FOOTER_HISCOD_DATA"] : "" }</a>
      <a className="footer-link" href="http://www.datavizdev.fr/" target="_blank">{ data.text ? data.text[data.lang]["FOOTER_PERSO_SITE"] : "" }</a>
    </footer>
  )
}

export default Footer
