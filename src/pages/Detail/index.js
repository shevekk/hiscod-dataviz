import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { selectData } from './../../utils/selectors'
import { DataContext } from '../../providers/data'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Detail() {

  const { data } = useContext(DataContext)

  const { id } = useParams()
  const selectedId = parseInt(id);

  const { txtContent, setTxtContent } = useState("");

  const [selectedData, setSelectedData] = useState([]);
  const [hiscodUrl, setHiscodUrl] = useState("");

  useEffect(() => {

    setSelectedData(data.data.find(d => d.id == selectedId));

    if(selectedData) {
      setHiscodUrl(`https://www.unicaen.fr/hiscod/fr/espagne/conflits_sociaux53.xml/${selectedData["id_riot_hiscod"]}fr.html`);
    }

  }, [data.data]);

  const DetailsContainer = styled.footer`
    margin : 5px;
    padding : 5px;
    border-radius : 5px;
    background-color: #eeeeee;
  `
  return (
    <DetailsContainer>
        <Link to={`/`}>Retour</Link><br/><br/>
        <a href={hiscodUrl} target="_blank">Lien vers Hiscod</a>
        {selectedData && Object.keys(selectedData).map((index) => (
            <p><strong>{index} : </strong>{selectedData[index]}</p>
        ))}
    </DetailsContainer>
  )
}

export default Detail
