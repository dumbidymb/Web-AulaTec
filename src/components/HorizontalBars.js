import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';

const Histograma = () => {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    const fetchHorasUsadas = async () => {
      try {
        const response = await axios.get('https://aulatec.zapto.org/prestamos/mae_horas');
        const data = response.data.map(item => ({
          maestro_nombre: item.maestro_nombre,
          total_horas_usadas: item.total_horas_usadas,
        }));
        setDataset(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHorasUsadas();
  }, []);

  const valueFormatter = (value) => `${value}h`;

  const chartSetting = {
    width: 800,
    height: 300,
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'maestro_nombre', label: '' }]}
        xAxis={[{ scaleType: 'linear', min: 0, max: 10, label: 'Horas Usadas', valueFormatter }]}
        series={[{ dataKey: 'total_horas_usadas', label: 'Horas Usadas', valueFormatter }]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
};

export default Histograma;
  