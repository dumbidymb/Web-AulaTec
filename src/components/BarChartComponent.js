import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const BarChartComponent = ({ maestroId }) => {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://18.232.46.147/prestamos/prestamo_horas', {
          maestro_id: maestroId,
        });
        const data = response.data.prestamos.map(item => ({
          day: item.day,
          hours: Math.abs(item.hours),
        }));
        setDataset(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (maestroId) {
      fetchData();
    }
  }, [maestroId]);

  const valueFormatter = (value) => `${value}h`;

  const chartSetting = {
    yAxis: [
      {
        label: 'Horas Usadas',
        valueFormatter,
        scaleType: 'linear',
        min: 0,
        max: 24,
        tickInterval: 1,
      },
    ],
    xAxis: [
      {
        label: 'Días de la Semana',
        dataKey: 'day',
        scaleType: 'band',
      },
    ],
    series: [{ dataKey: 'hours', label: 'Horas Usadas', valueFormatter }],
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

export default BarChartComponent;
