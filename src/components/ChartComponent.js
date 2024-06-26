import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  registerables
} from 'chart.js';
import 'chartjs-adapter-moment';
import zoomPlugin from 'chartjs-plugin-zoom';


ChartJS.register(
  ...registerables,
  zoomPlugin
);

const ChartComponent = ({ chartData, chartOptions }) => {
  const [clickedData, setClickedData] = useState(null);

  const options = {
    ...chartOptions,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const datasetIndex = elements[0].datasetIndex;
        const data = chartData.datasets[datasetIndex].data[elementIndex];
        setClickedData(data);
        alert(`Date: ${data.x}\nValue: ${data.y}`);
      }
    }
  };

  return (
    <div className="chart">
      <Line data={chartData} options={options} />
      {clickedData && (
        <div className="clicked-data">
          <p>Date: {clickedData.x.toString()}</p>
          <p>Value: {clickedData.y}</p>
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
