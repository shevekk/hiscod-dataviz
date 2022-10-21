import { useParams } from 'react-router-dom'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import LinesChart from '../../components/LinesChart'

function Administration() {

  const { chartType, groupSize } = useParams();

  return (
    <div className="chart">
    { chartType == "pie" ? 
      <PieChart propName="country_name" subPropName="admin_level_1" secondSubPropName="admin_level_2" thirdSubPropName="city_name" titleKey="ADMINISTRATION_TITLE" /> : ""
    }
    { chartType == "bars" ? 
      <BarChart groupSize={groupSize} propName="country_name" subPropName="admin_level_1" secondSubPropName="admin_level_2" thirdSubPropName="city_name" titleKey="ADMINISTRATION_TITLE" /> : ""
    }
    { chartType == "lines" ? 
      <LinesChart groupSize={groupSize} propName="country_name" subPropName="admin_level_1" secondSubPropName="admin_level_2" thirdSubPropName="city_name" titleKey="ADMINISTRATION_TITLE" /> : ""
    }
    </div>
  )
}

export default Administration