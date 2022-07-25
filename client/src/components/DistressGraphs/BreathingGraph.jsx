import React from "react";
import "./DistressGraphs.css";
import ReactApexChart from "react-apexcharts";

function BreathingGraph({ dataLogs }) {
  const reversedDataLogs = [...dataLogs].reverse();
  let categories = [];

  let dataBreathing = [];

  reversedDataLogs.map((dataLog) => {
    dataBreathing.push(dataLog.breathing);
    categories.push(dataLog.date);
  });

  let state = {
    seriesBreathing: [
      {
        name: "Breathing",
        data: dataBreathing,
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
      yaxis: {},
    },
  };

  return (
    <div className="distressGraphs">
      <h2>Breathing Symptoms Over Time</h2>
      <ReactApexChart
        options={state.options}
        series={state.seriesBreathing}
        type="line"
        height={350}
      />
    </div>
  );
}

export default BreathingGraph;
