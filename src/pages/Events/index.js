import { useParams } from 'react-router-dom'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import LinesChart from '../../components/LinesChart'

function Events() {

  const { chartType, groupSize } = useParams();

  return (
    <div className="chart">
    { chartType === "bars" ? 
      <BarChart groupSize={groupSize} propName="" titleKey="EVENTS_TITLE" /> : ""
    }
    { chartType === "lines" ? 
      <LinesChart groupSize={groupSize} propName="" titleKey="EVENTS_TITLE" /> : ""
    }
    </div>
  )
}

export default Events