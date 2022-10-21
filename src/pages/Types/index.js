import { useParams } from 'react-router-dom'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import LinesChart from '../../components/LinesChart'

function Types() {

  const { chartType, groupSize } = useParams();

  return (
    <div className="chart">
    { chartType === "pie" ? 
      <PieChart propName="riot_type_hiscod" subPropName="riot_type_original_database_1" titleKey="TYPES_TITLE" /> : ""
    }
    { chartType === "bars" ? 
      <BarChart groupSize={groupSize} propName="riot_type_hiscod" subPropName="riot_type_original_database_1" titleKey="TYPES_TITLE" /> : ""
    }
    { chartType === "lines" ? 
      <LinesChart groupSize={groupSize} propName="riot_type_hiscod" subPropName="riot_type_original_database_1" titleKey="TYPES_TITLE" /> : ""
    }
    </div>
  )
}

export default Types