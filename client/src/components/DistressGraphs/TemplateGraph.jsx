import React from "react";
import "./DistressGraphs.css";
import ReactApexChart from "react-apexcharts";

function TemplateGraph({ dataLogs, type }) {
  const reversedDataLogs = [...dataLogs].reverse();
  let categories = [];
  let data = [];
  let typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);

  reversedDataLogs.map((dataLog) => {
    data.push(dataLog[type]);

    categories.push(dataLog.date);
  });

  let state = {
    series: [
      {
        name: `${typeCapitalized}`,
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
          text: "Distress Level",
        },
        min: 0,
        max: 10,
      },
    },
  };

  return (
    <div className="distressGraphs">
      <h2>{typeCapitalized} Symptoms Over Time</h2>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default TemplateGraph;
