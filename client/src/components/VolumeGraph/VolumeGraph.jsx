import React from 'react'
import "./VolumeGraph.css"
import ReactApexChart from 'react-apexcharts';

function VolumeGraph({dataLogs}) {
    const reversedDataLogs = [...dataLogs].reverse();
    let categories = [];
    let data = [];
    reversedDataLogs.map(dataLog => {
        categories.push(dataLog.date);
        data.push(dataLog.drainOutput);
    }
    );

    let state = {
          
        series: [{
            name: "Volume",
            data: data
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
          colors: ['rgba(42, 63, 38, 0.65)'],
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
            title: {
              text: 'Volume in mL',
            },
            min: 0,
          },
          
        },
      
      
      };

  return (
    <div className='volumeGraph'>
        <h2>Drain Output Volume Over Time</h2>
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
    
    </div>
  )
}

export default VolumeGraph
