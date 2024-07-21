import * as React from 'react';
import {
  Stack,
  FormControlLabel,
  Checkbox,
  Typography,
  Slider,
} from '@mui/material';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

// Generar datos aleatorios
const generateRandomData = (numPoints) => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    const uso = Math.random() * 200; // Uso entre 0 y 200 minutos
    const accidentes = Math.random() * 15; // Accidentes entre 0 y 15
    data.push({ uso, accidentes, id: `data-${i}` });
  }
  return data;
};

const protectorData = generateRandomData(50); // Generar 50 puntos de datos aleatorios

export default function Dispersion() {
  const [voronoiMaxRadius, setVoronoiMaxRadius] = React.useState(25);
  const [disableVoronoi, setDisableVoronoi] = React.useState(false);
  const [undefinedRadius, setUndefinedRadius] = React.useState(true);

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
        dataset={protectorData}
        series={[
          {
            label: 'Uso de Protectores vs Accidentes',
            data: protectorData.map((v) => ({ x: v.uso, y: v.accidentes, id: v.id })),
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
