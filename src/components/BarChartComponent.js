// src/components/BarChartComponent.js
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const BarChartComponent = () => {
  const dataset = [
    { day: 'Lunes', hours: 6 },
    { day: 'Martes', hours: 7 },
    { day: 'Miercoles', hours: 8 },
    { day: 'Jueves', hours: 5 },
    { day: 'Viernes', hours: 6 },
  ];

  const valueFormatter = (value) => `${value}h`;

  const chartSetting = {
    yAxis: [
      {
        label: 'Hours Worked',
        valueFormatter,
        scaleType: 'linear',
        min: 0,
        max: 8,
        tickInterval: 1,
      },
    ],
    xAxis: [
      {
        label: 'Days of the Week',
        dataKey: 'day',
        scaleType: 'band',
      },
    ],
    series: [{ dataKey: 'hours', label: 'Hours Worked', valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },
  };

  return (
    <div style={{ width: '550px' }}>
      <BarChart dataset={dataset} {...chartSetting} />
    </div>
  );
};

export default BarChartComponent;
