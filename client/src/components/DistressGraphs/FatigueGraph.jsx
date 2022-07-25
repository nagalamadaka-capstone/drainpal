import React from "react";
import "./DistressGraphs.css";
import ReactApexChart from "react-apexcharts";

function FatigueGraph({ dataLogs }) {
  const reversedDataLogs = [...dataLogs].reverse();
  let categories = [];

  let dataFatigue = [];

  reversedDataLogs.map((dataLog) => {
    dataFatigue.push(dataLog.fatigue);
    categories.push(dataLog.date);
  });

  let state = {
    seriesFatigue: [
      {
        name: "Fatigue",
        data: dataFatigue,
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
      colors: ['rgba(42, 63, 38, 0.65)'],
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {},
    },
  };

  return (
    <div className="distressGraphs">
      <h2>Fatigue Symptoms Over Time</h2>
      <ReactApexChart
        options={state.options}
        series={state.seriesFatigue}
        type="line"
        height={350}
      />
    </div>
  );
}

export default FatigueGraph;
