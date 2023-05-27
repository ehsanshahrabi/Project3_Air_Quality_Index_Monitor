let dropdownCity = d3.select("#citySelect");
let dropdownPollutant = d3.select("#pollutantSelect");
let plotsDiv = d3.select("#plots");

// Define the pollutants excluding 'p'
const pollutants = ['co', 'no2', 'o3', 'pm10', 'pm25', 'so2'];
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
                let pollutantValue = cityData.iaqi[selectedPollutant]?.v;
                if (pollutantValue !== undefined) {
                    Plotly.newPlot("plots", [{
                        x: [selectedPollutant],
                        y: [pollutantValue],
                        type: 'bar',
                        marker: {
                            color: pollutantValue <= 50 ? 'green' : pollutantValue <= 100 ? 'yellow' : pollutantValue <= 150 ? 'orange' : 'red'
                        }
                    }], {
                        title: 'Air Quality Index',
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
                    let value = cityData.iaqi[pollutant]?.v;
                    if (value !== undefined) {
                        xData.push(pollutant);
                        yData.push(value);
                        colors.push(value <= 50 ? 'green' : value <= 100 ? 'yellow' : value <= 150 ? 'orange' : 'red');
                    }
                });

                Plotly.newPlot("plots", [{
                    x: xData,
                    y: yData,
                    type: 'bar',
                    marker: { color: colors }
                }], {
                    title: 'Air Quality Index',
                    xaxis: { title: 'Pollutant' },
                    yaxis: { title: 'Value' }
                });
            }
        }
    }
});
