
const exportInCSV = function(filteredData, headers) {
	
	// Add header
	let csv = '';  
	for(let j = 0; j < headers.length; j++) {
		csv += headers[j] + ";";
	}
	csv = csv.substring(0, csv.length - 1);
    csv += "\n";

    // Add content
    for(let i = 0; i < filteredData.length; i++) {
	    for(let j = 0; j < headers.length; j++) {
	    	if(!filteredData[i][headers[j]]) {
	    		csv += ';';
	    	}
	    	else {
	    		csv += filteredData[i][headers[j]] + ';';
	    	}
	    }

	    csv = csv.substring(0, csv.length - 1);
	    csv += "\n";
	}
   
    // Export in folder
    let csvFile = new Blob([csv], {type:"text/csv"});
	let downloadLink = document.createElement("a");
	downloadLink.download = 'hiscod_export.csv';
	downloadLink.href = window.URL.createObjectURL(csvFile);
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);
	downloadLink.click();
}

export default exportInCSV