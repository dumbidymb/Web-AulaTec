import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';

// Generar datos aleatorios
const generateRandomLoanData = (numPoints) => {
  const data = [];
  for (let i = 1; i <= numPoints; i++) {
    const hours = `${i}-${i + 1}h`;
    const count = Math.floor(Math.random() * 50) + 1; // Cantidad entre 1 y 50
    data.push({ time: hours, count });
  }
  return data;
};

const loanData = generateRandomLoanData(20); // Generar 20 puntos de datos aleatorios

const series = [
  { type: 'bar', dataKey: 'count', color: '#bfdbf7' },
];

export default function Histograma() {
  const [reverseX, setReverseX] = React.useState(false);
  const [reverseLeft, setReverseLeft] = React.useState(false);

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack direction="row">
        <Checkbox
          checked={reverseX}
          onChange={(e) => setReverseX(e.target.checked)}
        />
        <label>Revertir Eje X</label>
        <Checkbox
          checked={reverseLeft}
          onChange={(e) => setReverseLeft(e.target.checked)}
        />
        <label>Revertir Eje Izquierdo</label>
      </Stack>
      <Box sx={{ width: '100%' }}>
        <ResponsiveChartContainer
          series={series}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'time',
              label: 'Tiempo de Préstamo/Devolución',
              reverse: reverseX,
            },
          ]}
          yAxis={[
            { id: 'leftAxis', reverse: reverseLeft },
          ]}
          dataset={loanData}
          height={280}
        >
          <ChartsGrid horizontal />
          <BarPlot />
          <ChartsXAxis />
          <ChartsYAxis axisId="leftAxis" label="Cantidad" />
          <ChartsTooltip />
        </ResponsiveChartContainer>
      </Box>
    </Stack>
  );
}
