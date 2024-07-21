// src/components/BarChartComponent.js
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const generateRandomData = () => {
  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  const dataset = days.map(day => ({
    day,
    hours: Math.floor(Math.random() * 10) + 1, // Horas entre 1 y 10
  }));
  return dataset;
};

const Barras = () => {
  const dataset = generateRandomData();

  const valueFormatter = (value) => `${value}h`;

  const chartSetting = {
    yAxis: [
      {
        label: '',
        valueFormatter,
        scaleType: 'linear',
        min: 0,
        max: 10,
        tickInterval: 1,
      },
    ],
    xAxis: [
      {
        label: 'Dias de la semana ',
        dataKey: 'day',
        scaleType: 'band',
      },
    ],
    series: [{ dataKey: 'hours', label: 'Horas', valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },
  };

  return (
    <div style={{ width: '600px' }}>
      <BarChart dataset={dataset} {...chartSetting} />
    </div>
  );
};

export default Barras;
