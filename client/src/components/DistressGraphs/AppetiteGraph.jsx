import React from "react";
import "./DistressGraphs.css";
import ReactApexChart from "react-apexcharts";

function AppetiteGraph({ dataLogs }) {
  const reversedDataLogs = [...dataLogs].reverse();
  let categories = [];

  let dataAppetite = [];

  reversedDataLogs.map((dataLog) => {
    dataAppetite.push(dataLog.appetite);
    categories.push(dataLog.date);
  });

  let state = {
    seriesAppetite: [
      {
        name: "Appetite",
        data: dataAppetite,
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
      colors: ['rgba(42, 63, 38, 0.65)'],
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
          text: 'Distress Level',
        },
        min: 0,
        max: 10
      },
    },
  };

  return (
    <div className="distressGraphs">
      <h2>Appetite Symptoms Over Time</h2>
      <ReactApexChart
        options={state.options}
        series={state.seriesAppetite}
        type="line"
        height={350}
      />
    </div>
  );
}

export default AppetiteGraph;
