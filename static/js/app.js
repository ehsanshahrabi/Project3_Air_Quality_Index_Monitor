let dropdownCity = d3.select("#citySelect");
let dropdownPollutant = d3.select("#pollutantSelect");
let plotsDiv = d3.select("#plots");
let view2Div = d3.select("#view2");

// Define the pollutants
const pollutants = ['o3', 'pm10', 'pm25']; // Updated the pollutants
// Add options to the pollutant dropdown
dropdownPollutant.append("option").text("All").property("value", "All");
pollutants.forEach(pollutant => {
    const capitalizedPollutant = pollutant.toUpperCase();
    dropdownPollutant.append("option").text(capitalizedPollutant).property("value", pollutant);
});

// Get data
d3.json("/data/aqi_data_ok_status.json").then(data => {
    let cities = Object.keys(data).sort();  // Sort city names
    cities.forEach(city => {
        dropdownCity.append("option").text(city).property("value", city);
    })

    dropdownCity.on("change", updatePlots);
    dropdownPollutant.on("change", updatePlots);

    function updatePlots() {
        let selectedCity = dropdownCity.property("value");
        let selectedPollutant = dropdownPollutant.property("value");
        let cityData = data[selectedCity].data;

        if (cityData) {
            plotsDiv.html("");  // Clear previous plots

            if (selectedPollutant !== 'All') {
                let pollutantData = cityData.forecast.daily[selectedPollutant];
                if (pollutantData) {
                    let lastPollutantData = pollutantData[pollutantData.length - 1]; // get last data
                    let avgValue = lastPollutantData.avg;

                    Plotly.newPlot("plots", [{
                        x: [selectedPollutant],
                        y: [avgValue],
                        type: 'bar',
                        marker: {
                            color: avgValue <= 50 ? '#61d17d' : avgValue <= 100 ? '#f3f367' : avgValue <= 150 ? '#f5cb6a' : '#f04856'
                        }
                    }], {
                        title: 'Air Quality Index - View 1',
                        xaxis: { title: 'Pollutant' },
                        yaxis: { title: 'Value' }
                    });
                } else {
                    plotsDiv.html(`<p>No data available for pollutant ${selectedPollutant} in city ${selectedCity}.</p>`);
                }
            } else {
                let xData = [];
                let yData = [];
                let colors = [];

                pollutants.forEach(pollutant => {
                    let pollutantData = cityData.forecast.daily[pollutant];
                    if (pollutantData) {
                        let lastPollutantData = pollutantData[pollutantData.length - 1]; // get last data
                        let avgValue = lastPollutantData.avg;

                        xData.push(pollutant);
                        yData.push(avgValue);
                        colors.push(avgValue <= 50 ? '#61d17d' : avgValue <= 100 ? '#f3f367' : avgValue <= 150 ? '#f5cb6a' : '#f04856');
                    }
                });

                Plotly.newPlot("plots", [{
                    x: xData,
                    y: yData,
                    type: 'bar',
                    marker: { color: colors }
                }], {
                    title: 'Air Quality Index - View 1',
                    xaxis: { title: 'Pollutant' },
                    yaxis: { title: 'Value' }
                });
            }
        }
    }


    // Additional View 2
    function createView2() {
        let selectedCity = dropdownCity.property("value");
        let cityData = data[selectedCity].data;

        if (cityData) {
            view2Div.html("");  // Clear previous content

            let dailyAQIData = cityData.forecast.daily;
            let pm25Data = dailyAQIData.pm25;
            let pm10Data = dailyAQIData.pm10;

            let xData = pm25Data.map(d => d.day);
            let pm25Values = pm25Data.map(d => d.avg);
            let pm10Values = pm10Data.map(d => d.avg);

            let trace1 = {
                x: xData,
                y: pm25Values,
                type: 'scatter',
                mode: 'markers+lines', // Add 'markers+' to include dots
                name: 'PM2.5',
                line: { color: 'blue' },
                marker: { size: 5 } // Set the size of the dots
            };

            let trace2 = {
                x: xData,
                y: pm10Values,
                type: 'scatter',
                mode: 'markers+lines', // Add 'markers+' to include dots
                name: 'PM10',
                line: { color: 'green' },
                marker: { size: 5 } // Set the size of the dots
            };

            let layout = {
                title: 'Daily AQI Levels - View 2',
                xaxis: {
                    title: 'Date',
                    tickformat: '%Y-%m-%d' // Set the tick format to display only the date
                },
                yaxis: { title: 'Average AQI Value' },
                width: 800, // Set the desired width for the plot
                margin: {
                    l: 50,
                    r: 50,
                    t: 50,
                    b: 50
                },
                shapes: [
                    // Add four horizontal lines with pollutantValue color and range
                    {
                        type: 'line',
                        x0: xData[0],
                        x1: xData[xData.length - 1],
                        y0: 2,
                        y1: 2,
                        line: { color: '#3DC95E', width: 2, dash: 'dash' }
                    },
                    {
                        type: 'line',
                        x0: xData[0],
                        x1: xData[xData.length - 1],
                        y0: 51,
                        y1: 51,
                        line: { color: '#FDFD6F', width: 2, dash: 'dash' }
                    },
                    {
                        type: 'line',
                        x0: xData[0],
                        x1: xData[xData.length - 1],
                        y0: 101,
                        y1: 101,
                        line: { color: '#FFC43B', width: 2, dash: 'dash' }
                    },
                    {
                        type: 'line',
                        x0: xData[0],
                        x1: xData[xData.length - 1],
                        y0: 151,
                        y1: 151,
                        line: { color: '#FE4B5A', width: 2, dash: 'dash' }
                    }
                ]
            };

            Plotly.newPlot("view2", [trace1, trace2], layout);
        }
    }

    dropdownCity.on("change", createView2);


});
