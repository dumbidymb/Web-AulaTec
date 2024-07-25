import React, { useState, useEffect } from 'react';
import "../sources/timeline.css";

const Timeline = ({ selectedPrestamo }) => {
  const [timelineData, setTimelineData] = useState([]);
  const [totalHoras, setTotalHoras] = useState(0);

  useEffect(() => {
    if (selectedPrestamo) {
      fetch('http://18.232.46.147/prestamos/prestamo_horas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prestamo_id: selectedPrestamo.prestamo_id })
      })
      .then(response => response.json())
      .then(data => {
        if (data.horas_usadas) {
          const horasUsadas = data.horas_usadas;
          setTotalHoras(horasUsadas);
        }
      })
      .catch(error => console.error('Error fetching horas usadas:', error));

      fetch('http://localhost:5000/prestamos/prestamo_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prestamo_id: selectedPrestamo.prestamo_id })
      })
      .then(response => response.json())
      .then(data => {
        if (data.prestamo_info) {
          const { hora_entrada, hora_salida } = data.prestamo_info;
          const timelineItems = generateTimelineItems(hora_entrada, hora_salida);
          setTimelineData(timelineItems);
        } else {
          setTimelineData([]);
        }
      })
      .catch(error => console.error('Error fetching prestamo info:', error));
    }
  }, [selectedPrestamo]);

  const generateTimelineItems = (horaEntrada, horaSalida) => {
    const startHour = 8;
    const endHour = 17;
    const timelineItems = [];

    const horaEntradaHour = parseInt(horaEntrada.split(':')[0], 10);
    const horaSalidaHour = parseInt(horaSalida.split(':')[0], 10);

    for (let hour = startHour; hour <= endHour; hour++) {
      const timeString = `${hour}:00`;
      let description = 'No en uso';
      let icon = '🔴';
      if (hour > horaEntradaHour && hour < horaSalidaHour) {
        description = 'En uso';
        icon = '🟢'; 
      } else if (hour === horaEntradaHour || hour === horaSalidaHour) {
        description = 'En uso';
        icon = '🟢';
      }
      if (horaEntradaHour === horaSalidaHour) {
        description = 'En uso';
        icon = '🟢';
      }

      timelineItems.push({
        time: timeString,
        description: description,
        icon: icon
      });
    }

    return timelineItems;
  };

  return (
    <div className="timeline">
      <div className="header">
        <h2>Actividad</h2>
        <p>Total de horas en uso: {totalHoras}</p>
      </div>
      <div className="timeline-items">
        {timelineData.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-icon">{item.icon}</div>
            <div className="timeline-content">
              <div className="time">{item.time}</div>
              <div className="description">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;