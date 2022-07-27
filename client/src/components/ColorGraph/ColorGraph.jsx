import React from 'react'
import "./ColorGraph.css"
import ReactApexChart from 'react-apexcharts';

function ColorGraph({dataLogs}) {
    const reversedDataLogs = [...dataLogs].reverse();
    let categories = [];
    let data = [];
    reversedDataLogs.map(dataLog => {
        categories.push(dataLog.date);
        let hex = dataLog.color;
        console.log('hex: ', hex);
        let hsl = hexToHsl(hex);
        console.log('hsl: ', hsl);
        data.push(hsl);
    }
    );

    let state = {
          
        series: [{
            name: "Color",
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
              text: 'hsl color values:',
            },
            min: 0,
          },
          
        },
      
      
      };

  return (
    <div className='colorGraph'>
        <h2>Drain Color Volume Over Time</h2>
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
    
    </div>
  )
}

export default ColorGraph
