import React from 'react'
import "./DistressGraphs.css"
import ReactApexChart from 'react-apexcharts';

function DistressGraphs({dataLogs}) {
    console.log('dataLogs: ', dataLogs);
    const reversedDataLogs = [...dataLogs].reverse();
    let categories = [];
    let dataPain = [];
    let dataBowels = [];
    let dataBreathing = [];
    let dataAppetite = [];
    let dataNausea = [];
    let dataFatigue = [];
    let dataSleeping = [];
    reversedDataLogs.map(dataLog => {
        categories.push(dataLog.date);
        dataPain.push(dataLog.pain);
        dataBowels.push(dataLog.bowels);
        dataBreathing.push(dataLog.breathing);
        dataAppetite.push(dataLog.appetite);
        dataNausea.push(dataLog.nausea);
        dataFatigue.push(dataLog.fatigue);
        dataSleeping.push(dataLog.sleeping);
    }
    );

    let state = {
        seriesPain: [{
            name: "Pain",
            data: dataPain,
        }],
        seriesBowels: [{
            name: "Bowels",
            data: dataBowels,
        }],
        seriesBreathing: [{
            name: "Breathing",
            data: dataBreathing,
        }],
        seriesAppetite: [{
            name: "Appetite",
            data: dataAppetite,
        }],
        seriesNausea: [{
            name: "Nausea",
            data: dataNausea,
        }],
        seriesFatigue: [{
            name: "Fatigue",
            data: dataFatigue,
        }],
        seriesSleeping: [{
            name: "Sleeping",
            data: dataSleeping,
        }],

        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          grid: {
            row: {
              colors: ['transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: categories,
          },
          yaxis: {
            
          }
        },
      
      
      };

  return (
    <div className='distressGraphs'>
        <h2>Pain Symptoms Over Time</h2>
        <ReactApexChart options={state.options} series={state.seriesPain} type="line" height={350} />
        <h2>Bowels Symptoms Over Time</h2>
        <ReactApexChart options={state.options} series={state.seriesBowels} type="line" height={350} />
        <h2>Breathing Symptoms Over Time</h2>
        <ReactApexChart options={state.options} series={state.seriesBreathing} type="line" height={350} />
        <h2>Appetite Symptoms Over Time</h2>
        <ReactApexChart options={state.options} series={state.seriesAppetite} type="line" height={350} />
        <h2>Nausea Symptoms Over Time</h2>
        <ReactApexChart options={state.options} series={state.seriesNausea} type="line" height={350} />
        <h2>Fatigue Symptoms Over Time</h2>
        <ReactApexChart options={state.options} series={state.seriesFatigue} type="line" height={350} />
        <h2>Sleeping Symptoms Over Time</h2>
        <ReactApexChart options={state.options} series={state.seriesSleeping} type="line" height={350} />
    
    </div>
  )
}

export default DistressGraphs
