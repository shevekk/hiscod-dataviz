import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/data'

function Help() {

	const { data, setData } = useContext(DataContext)
	const [lang, setLang] = useState("fr");
		useEffect(() => {
		setLang(data.lang);
	}, [data.lang]);

	return (
		<div className="help-div">
			{ data.text ? 
				<div>
			    	<h1>{ data.text[data.lang]["HELP_TITLE"] }</h1>
			    	<p>{ data.text[data.lang]["HELP_DESCR1"] }</p>
			    	<p>{ data.text[data.lang]["HELP_DESCR2"] }</p>
			    	<p>{ data.text[data.lang]["HELP_DESCR3"] }</p>

			    	<h3>{ data.text[data.lang]["HELP_TYPES_TITLE"] } :</h3>
			    	<ul>
					  <li><strong>{ data.text[data.lang]["HELP_TYPES_TABLE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_TABLE_DESCR"] }</li>
					  <ul>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_TABLE_STARTDATE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_TABLE_STARTDATE_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_TABLE_ENDDATE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_TABLE_ENDDATE_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_TABLE_SEARCH_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_TABLE_SEARCH_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_TABLE_NUMBERDATA_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_TABLE_NUMBERDATA_DESCR"] }</li>
					  </ul><br/>

					  <li><strong>{ data.text[data.lang]["HELP_TYPES_MAP_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_MAP_DESCR"] }</li>
					  <ul>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_MAP_NORMAL_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_MAP_NORMAL_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_MAP_HEXA_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_MAP_HEXA_DESCR"] }</li>
					  </ul><br/>

					  <li><strong>{ data.text[data.lang]["HELP_TYPES_EVENT_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_EVENT_DESCR"] }</li>
					  <ul>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_EVENT_LINE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_EVENT_LINE_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_EVENT_BAR_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_EVENT_BAR_TITLE"] }</li>
					  </ul><br/>

					  <li><strong>{ data.text[data.lang]["HELP_TYPES_TYPES_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_TYPES_DESCR"] }</li>
					  <ul>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_TYPES_PIE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_TYPES_PIE_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_TYPES_LINE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_TYPES_LINE_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_TYPES_BAR_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_TYPES_BAR_DESCR"] }</li>
					  </ul><br/>

					  <li><strong>{ data.text[data.lang]["HELP_TYPES_ADMIN_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_ADMIN_DESCR"] }</li>
					  <ul>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_ADMIN_PIE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_ADMIN_PIE_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_ADMIN_LINE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_ADMIN_LINE_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_ADMIN_BAR_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_ADMIN_BAR_DESCR"] }</li>
					  </ul><br/>

					  <li><strong>{ data.text[data.lang]["HELP_TYPES_ADMINHISTO_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_ADMINHISTO_DESCR"] }</li>
					  <ul>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_ADMINHISTO_PIE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_ADMINHISTO_PIE_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_ADMINHISTO_LINE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_ADMINHISTO_LINE_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_ADMINHISTO_BAR_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_ADMINHISTO_BAR_DESCR"] }</li>
					  </ul><br/>

					  <li><strong>{ data.text[data.lang]["HELP_TYPES_PARTICIPANTS_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_PARTICIPANTS_DESCR"] }</li>
					  <ul>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_PARTICIPANTS_PIE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_PARTICIPANTS_PIE_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_PARTICIPANTS_LINE_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_PARTICIPANTS_LINE_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_PARTICIPANTS_BAR_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_PARTICIPANTS_BAR_DESCR"] }</li>
					  </ul><br/>

					  <li><strong>{ data.text[data.lang]["HELP_TYPES_HEATMAP_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_HEATMAP_DESCR"] }</li>
					  <ul>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_HEATMAP_YEAR_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_HEATMAP_YEAR_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_HEATMAP_MONTH_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_HEATMAP_MONTH_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_HEATMAP_DAY_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_HEATMAP_DAY_DESCR"] }</li>
					  	<li><strong>{ data.text[data.lang]["HELP_TYPES_HEATMAP_DAYOFWEEK_TITLE"] } :</strong> { data.text[data.lang]["HELP_TYPES_HEATMAP_DAYOFWEEK_DESCR"] }</li>
					  </ul><br/>
					</ul>

				  	<h3>{ data.text[data.lang]["HELP_FILTER_TITLE"] } : </h3>
				  		<ul>
				  		<li><strong>{ data.text[data.lang]["HELP_FILTER_DATES_TITLE"] } :</strong> { data.text[data.lang]["HELP_FILTER_DATES_DESCR"] }</li><br/>
				  		<li><strong>{ data.text[data.lang]["HELP_FILTER_TYPES_TITLE"] } :</strong> { data.text[data.lang]["HELP_FILTER_TYPES_DESCR"] }</li><br/>
				  		<li><strong>{ data.text[data.lang]["HELP_FILTER_COUNTRY_TITLE"] } :</strong> { data.text[data.lang]["HELP_FILTER_COUNTRY_DESCR"] }</li><br/>
				  		<li><strong>{ data.text[data.lang]["HELP_FILTER_COUNTRYHISTO_TITLE"] } :</strong> { data.text[data.lang]["HELP_FILTER_COUNTRYHISTO_DESCR"] }</li><br/>
				  		<li><strong>{ data.text[data.lang]["HELP_FILTER_PARTICIPANTS_TITLE"] } :</strong> { data.text[data.lang]["HELP_FILTER_PARTICIPANTS_DESCR"] }</li><br/>
				  		<li><strong>{ data.text[data.lang]["HELP_FILTER_WOMANS_TITLE"] } :</strong> { data.text[data.lang]["HELP_FILTER_WOMANS_DESCR"] }</li><br/>
				  		<li><strong>{ data.text[data.lang]["HELP_FILTER_AUTHOR_TITLE"] } :</strong> { data.text[data.lang]["HELP_FILTER_AUTHOR_DESCR"] }</li><br/>
				  		<li><strong>{ data.text[data.lang]["HELP_FILTER_DATESCREATION_TITLE"] } :</strong> { data.text[data.lang]["HELP_FILTER_DATESCREATION_DESCR"] }</li><br/>
				  		<li><strong>{ data.text[data.lang]["HELP_FILTER_EXPORTBUTTON_TITLE"] } :</strong> { data.text[data.lang]["HELP_FILTER_EXPORTBUTTON_DESCR"] }</li><br/>
				  		<li><strong>{ data.text[data.lang]["HELP_FILTER_FILTERBUTTON_TITLE"] } :</strong> { data.text[data.lang]["HELP_FILTER_FILTERBUTTON_DESCR"] }</li><br/>
				  		<li><strong>{ data.text[data.lang]["HELP_FILTER_NBDATAS_TITLE"] } :</strong> { data.text[data.lang]["HELP_FILTER_NBDATAS_DESCR"] }</li>
				  	</ul>

				  	<br/>
				  	<h3>{ data.text[data.lang]["HELP_EXEMPLE_TITLE"] } : </h3>

				  	<img src="../../img/1848_par_pays.png" className="help-img" />
				  	<p>{ data.text[data.lang]["HELP_EXEMPLE_1848"] }</p>
				  	<br/>
				  	<img src="../../img/revFR_regions.png" className="help-img" />
				  	<p>{ data.text[data.lang]["HELP_EXEMPLE_MONTH_REVFR"] }</p>
				  	<br/>
				  	<img src="../../img/types_events_refFR.png" className="help-img" />
				  	<p>{ data.text[data.lang]["HELP_EXEMPLE_TYPES_REVFR"] }</p>

				  	<br/><br/>
			  	</div>
			: ""}
		</div>
  	)
}

export default Help