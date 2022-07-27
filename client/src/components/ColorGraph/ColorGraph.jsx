import React from "react";
import "./ColorGraph.css";
import ReactApexChart from "react-apexcharts";

function ColorGraph({ dataLogs }) {
  function hexToHsl(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r = r / 255;
    g = g / 255;
    b = b / 255;

    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(h * 360);

    return h;
  }

  const reversedDataLogs = [...dataLogs].reverse();
  let categories = [];
  let data = [];
  reversedDataLogs.map((dataLog) => {
    categories.push(dataLog.date);
    let hex = dataLog.drainColor;

    let hsl = hexToHsl(hex);

    data.push(hsl);
  });

  let state = {
    series: [
      {
        name: "Color",
        data: data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      colors: ["rgba(42, 63, 38, 0.65)"],
      grid: {
        row: {
          colors: ["transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        title: {
          text: "hsl color values:",
        },
        min: 0,
      },
    },
  };

  return (
    <div className="colorGraph">
      <h2>Drain Color Over Time</h2>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default ColorGraph;
