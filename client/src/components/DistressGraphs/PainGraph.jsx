import React from "react";
import "./DistressGraphs.css";
import ReactApexChart from "react-apexcharts";

function PainGraph({ dataLogs }) {
  const reversedDataLogs = [...dataLogs].reverse();
  let categories = [];

  let data = [];

  reversedDataLogs.map((dataLog) => {
    data.push(dataLog.pain);
    categories.push(dataLog.date);
  });

  let state = {
    series: [
      {
        name: "Pain",
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
      <h2>Pain Symptoms Over Time</h2>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default PainGraph;
