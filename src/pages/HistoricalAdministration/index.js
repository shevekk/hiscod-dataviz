import { useParams } from 'react-router-dom'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import LinesChart from '../../components/LinesChart'

function HistoricalAdministration() {

  const { chartType, groupSize } = useParams();

  return (
    <div className="chart">
    { chartType == "pie" ? 
      <PieChart propName="historical_political_entity" subPropName="historical_admin_level_1" secondSubPropName="historical_admin_level_2" titleKey="ADMINISTRATION_TITLE" /> : ""
    }
    { chartType == "bars" ? 
      <BarChart groupSize={groupSize} propName="historical_political_entity" subPropName="historical_admin_level_1" secondSubPropName="historical_admin_level_2" titleKey="ADMINISTRATION_TITLE" /> : ""
    }
    { chartType == "lines" ? 
      <LinesChart groupSize={groupSize} propName="historical_political_entity" subPropName="historical_admin_level_1" secondSubPropName="historical_admin_level_2" titleKey="ADMINISTRATION_TITLE" /> : ""
    }
    </div>
  )
}

export default HistoricalAdministration