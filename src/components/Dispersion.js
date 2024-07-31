import * as React from 'react';
import {
  Stack,
  FormControlLabel,
  Checkbox,
  Typography,
  Slider,
} from '@mui/material';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import axios from 'axios';

export default function Dispersion() {
  const [voronoiMaxRadius, setVoronoiMaxRadius] = React.useState(25);
  const [disableVoronoi, setDisableVoronoi] = React.useState(false);
  const [undefinedRadius, setUndefinedRadius] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://aulatec.zapto.org/disponibilidad');
        const fetchedData = response.data.map(item => ({
          uso: item.total_horas_usadas,
          accidentes: item.porcentaje_disponibilidad,
          id: item.proyector_nombre,
        }));
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMaxRadiusChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setVoronoiMaxRadius(newValue);
  };

  return (
    <Stack direction="column" sx={{ width: '100%' }}>
      <ScatterChart
        height={300}
        disableVoronoi={disableVoronoi}
        voronoiMaxRadius={undefinedRadius ? undefined : voronoiMaxRadius}
        dataset={data}
        series={[
          {
            label: 'Uso de Protectores vs Disponibilidad',
            data: data.map((v) => ({ x: v.uso, y: v.accidentes, id: v.id })),
          },
        ]}
      />
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={disableVoronoi}
              onChange={(event) => setDisableVoronoi(event.target.checked)}
            />
          }
          label="Deshabilitar Voronoi"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={undefinedRadius}
              onChange={(event) => setUndefinedRadius(event.target.checked)}
            />
          }
          label="Radio Máximo Indefinido"
        />
        <Typography variant="body2">Radio Máximo Voronoi</Typography>
        <Slider
          value={voronoiMaxRadius}
          onChange={handleMaxRadiusChange}
          min={1}
          max={100}
          step={1}
          disabled={undefinedRadius}
          sx={{ width: 200 }}
        />
      </Stack>
    </Stack>
  );
}
