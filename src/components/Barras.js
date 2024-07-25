import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const Barras = () => {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://18.232.46.147/prestamos/horas');
        const data = response.data.map(item => ({
          proyector_nombre: item.proyector_nombre,
          total_horas_usadas: Math.abs(item.total_horas_usadas),
        }));
        setDataset(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const valueFormatter = (value) => `${value}h`;

  const chartSetting = {
    yAxis: [
      {
        label: '',
        valueFormatter,
        scaleType: 'linear',
        min: 0,
        max: 24,
        tickInterval: 1,
      },
    ],
    xAxis: [
      {
        label: 'Proyectores',
        dataKey: 'proyector_nombre',
        scaleType: 'band',
      },
    ],
    series: [{ dataKey: 'total_horas_usadas', label: 'Horas Usadas', valueFormatter }],
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
