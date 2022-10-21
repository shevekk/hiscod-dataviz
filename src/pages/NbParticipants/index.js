import { useParams } from 'react-router-dom'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import LinesChart from '../../components/LinesChart'

function NbParticipants() {

  const { chartType, groupSize } = useParams();

  return (
    <div className="chart">
    { chartType === "pie" ? 
      <PieChart propName="nb_participants_number" titleKey="PARTICIPANTS_TITLE" /> : ""
    }
    { chartType === "bars" ? 
      <BarChart groupSize={groupSize} propName="nb_participants_number" titleKey="PARTICIPANTS_TITLE" /> : ""
    }
    { chartType === "lines" ? 
      <LinesChart groupSize={groupSize} propName="nb_participants_number" titleKey="PARTICIPANTS_TITLE" /> : ""
    }
    </div>
  )
}

export default NbParticipants