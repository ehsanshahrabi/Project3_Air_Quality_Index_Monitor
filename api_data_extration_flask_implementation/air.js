// !!!SETUP INSTRUCTIONS!!!!
// In order to run the queryURL below, you will need to import the database on mongoDB
//  from the Creating_MongoDB.ipynb on the jupyternotebook. Then open your mongoDBcompass and
// make sure you have an adequate amount of data. Thereafter, you run the MongoDB_Flask.py and open the 
// database url below and makesure you see the database (same as mongocompass database). 
// You can save changes on this file and access the index.html
//  from the Project3_Air_Quality_Intex_Monitor folder 

d3.json("data/aqi_data_ok_status.json").then(function(data) {
    printData(data);
});

// This is an example of how to access the data. You can see the output on the console
function printData(data) {
    if (data && Array.isArray(data) && data.length > 0) {
        data.forEach((obj) => {
            if (typeof obj === 'object') {
                console.log("AQI:", obj.aqi);
                console.log("City:", obj.city.name);
                if (obj.iaqi && obj.iaqi.pm25 && obj.iaqi.pm25.v) {
                    console.log("PM2.5:", obj.iaqi.pm25.v);
                }
                console.log("----------------------");
            } else {
                console.log("Invalid data format for an object.");
            }
        });
    } else {
        console.log("Invalid data format or empty data.");
    }
}

d3.json("data/aqi_data_ok_status.json").then(function(data) {
    const extractedData = extractData(data);
    airVisualization(extractedData.map(item => item.aqi), extractedData.map(item => item.city));
});

// Extract the necessary data from the original dataset
function extractData(data) {
    const extractedData = [];

    if (data && Array.isArray(data)) {
        data.forEach((obj) => {
            const extractedObj = {
                aqi: obj.aqi,
                city: obj.city.name,
                pm25: obj.iaqi && obj.iaqi.pm25 && obj.iaqi.pm25.v ? obj.iaqi.pm25.v : null
            };

            extractedData.push(extractedObj);
        });
    }

    return extractedData;
}

// Create the visualization using the extracted data
function airVisualization(aqi, city) {
    console.log(aqi);
    console.log(city);

    let aqiValues = aqi;
    let cityNames = city;

    let cityGraph = {
        x: cityNames,
        y: aqiValues,
        type: "bar",
    };

    let plotData = [cityGraph];

    let layout = {
        title: "AQI Chart"
    };

    Plotly.newPlot("plot", plotData, layout);
}
// Please create more visualizations below!! 
// Also if you need any more variables, you should look at the json file to see which to extract.
// Then add necessary variables to the extractedData Function