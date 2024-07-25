import React from 'react';
import "../sources/idcard.css"
import Cañon from "../assets/cañon.png"
import Profe from "../assets/male.png"

const Idcard = ({ selectedPrestamo }) => {
  return (
    <div className="id-card">
      <div className="id-card-header">
        <h1>Universidad Politecnica</h1>
        <p>Identificación de Proyector y Maestro</p>
      </div>
      <div className="id-card-body">
        <div className="photo-section">
          <img src={Profe} alt="Foto del Maestro" className="photo" />
          <img src={Cañon} alt="Foto del Proyector" className="photo" />
        </div>
        <div className="info-section">
          <div className="info">
            <h2>Información del Maestro</h2>
            <p>Nombre: {selectedPrestamo.maestro.nombre} {selectedPrestamo.maestro.ape_paterno} {selectedPrestamo.maestro.ape_materno}</p>
            <p>Correo: {selectedPrestamo.maestro.correo}</p>
          </div>
          <div className="info">
            <h2>Información del Proyector</h2>
            <p>Marca: {selectedPrestamo.proyector.marca}</p>
            <p>Estado: {selectedPrestamo.proyector.status}</p>
            <p>Número de Serie: {selectedPrestamo.proyector.numero_serie}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idcard;