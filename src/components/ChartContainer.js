import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ChartComponent from './ChartComponent';
import jsonData from '../data/chartData.json';

const ChartContainer = () => {
  const [chartData, setChartData] = useState({});
  const [timeframe, setTimeframe] = useState('day');

  useEffect(() => {
    const data = jsonData.map(item => ({
      
      x: moment(item.date).toDate(),
      y: item.value
    }));

    setChartData({
      datasets: [{
        label: 'Chart Data',
        data: data,
        borderColor: '#e4e820',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }]
    });
  }, []);

  const handleTimeframeChange = (unit) => {
    setTimeframe(unit);
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeframe,
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Value: ${context.raw.y}`;
          }
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'x',
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <h2>Charting Library</h2>
      <div className="timeframe-buttons">
        <button onClick={() => handleTimeframeChange('day')}>Daily</button>
        <button onClick={() => handleTimeframeChange('week')}>Weekly</button>
        <button onClick={() => handleTimeframeChange('month')}>Monthly</button>
      </div>
      {chartData.datasets ? (
        <ChartComponent chartData={chartData} chartOptions={chartOptions} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ChartContainer;
