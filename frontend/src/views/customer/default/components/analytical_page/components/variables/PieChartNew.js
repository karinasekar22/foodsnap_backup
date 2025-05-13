import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ chartData, chartOptions, width = 250, height = 250 }) => (
  <ReactApexChart
    options={chartOptions}
    series={chartData}
    type="pie"
    width={width}
    height={height}
  />
);

export default PieChart;
