import React from 'react';
import "../sources/idcard.css"
import Cañon from "../assets/cañon.png"
import Profe from "../assets/male.png"

const Idcard = () => {
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
            <p>Nombre: jose sluis estrada pineda </p>
            <p>Materia: matematicas</p>
          </div>
          <div className="info">
            <h2>Información del Proyector</h2>
            <p>Marca: z100 sonic </p>
            <p>lumenes: 5000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idcard;
