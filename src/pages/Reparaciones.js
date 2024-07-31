import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sources/Home.css';
import Fondo from '../assets/fondo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export const Reparaciones = () => {
  const navigate = useNavigate();
  const [proyectores, setProyectores] = useState([]);

  useEffect(() => {
    // Obtener datos de los proyectores desde el servidor
    const fetchProyectores = async () => {
      try {
        const response = await fetch('https://aulatec.zapto.org/proyectores');
        const data = await response.json();
        // Filtrar proyectores con estado 'deshabilitado'
        const proyectoresDeshabilitados = data.filter(proyector => proyector.status === 'deshabilitado');
        setProyectores(proyectoresDeshabilitados);
      } catch (error) {
        console.error('Error al obtener los datos de los proyectores:', error);
      }
    };

    fetchProyectores();
  }, []);

  const handleNavigate = () => {
    navigate('/inicio');
  };

  return (
    <>
      <nav className='navbar'>
        <div className='nav-links'>
          <a onClick={handleNavigate} href="#profesores" className='nav-link'>Regresar</a>
        </div>
      </nav>

      <div className='header-container'>
        <div className='header-background'>
          <img src={Fondo} alt="Background" className='header-image' />
          <div className='header-text'>
            <h1>AulaTec</h1>
            <p>El control está en tus manos.</p>
          </div>
        </div>
      </div>

      <div className="card-container">
        {proyectores.map(proyector => (
          <div className="card" key={proyector.id}>
            <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
            <p>{proyector.name} - Advertencia</p>
          </div>
        ))}
      </div>
    </>
  );
};
