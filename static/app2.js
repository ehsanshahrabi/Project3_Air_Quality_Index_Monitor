// Extract city data as an array of objects
let cityData = Object.keys(data).map(city => ({ city, aqi: data[city].data.aqi }));

// Sort the data by AQI in descending order
let sortedData = cityData.sort((a, b) => b.aqi - a.aqi);

// Slice the top 20 cities for visualization
let slicedData = sortedData.slice(0, 20);

// Reverse the order of the sliced data to display highest AQI on the left side
let reversedData = slicedData.reverse();

// Prepare data for the plot
let trace1 = {
  x: reversedData.map(city => city.city),
  y: reversedData.map(city => city.aqi),
  text: reversedData.map(city => `AQI: ${city.aqi}`),
  type: "bar",
  orientation: "v",
  marker: {
    color: reversedData.map(city => {
      if (city.aqi >= 0 && city.aqi <= 50) {
        return "#61d17d";   // Green
      } else if (city.aqi <= 100) {
        return "#f3f367"; // Yellow
      } else if (city.aqi <= 150) {
        return "#f5cb6a"; // Orange
      } else if (city.aqi <= 200) {
        return "#eb505c";   // Red
      } else if (city.aqi <= 300) {
        return "#79528d"; // Purple
      } else {
        return "#794553";   // Maroon
      }
    }),
  }
};

let traceData = [trace1];

// Configure layout for the plot
let layout = {
  title: {
    text: "<b>Top 20 Cities with Highest AQI</b>",
    font: {
      family: "sans-serif",
      size: 24,
      weight: "bold"
    },
    xref: "paper",
    x: 0.5,
    y: 0.95
  },
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  },
  yaxis: {
    title: {
      text: "AQI Value",
      font: {
        family: "sans-serif",
        size: 16,
        color: "#555555",
        weight: "bold"
      }
    },
    tickfont: {
      family: "sans-serif",
      size: 12,
      weight: "bold"      
    }
  },
  xaxis: {
    title: {
      text: "Major City",
      font: {
        family: "sans-serif",
        size: 16,
        color: "#555555",
        weight: "bold"
      }
    },
    tickfont: {
      family: "sans-serif",
      size: 12,
      weight: "bold"
    },
    autorange: "reversed"
  },
  height: 600 // Adjust the height of the bar chart as desired
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);


