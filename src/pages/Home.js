import React, { useState, useEffect } from 'react';
import '../sources/Home.css';
import Sidebar from '../components/Sidebar';
import Male from "../assets/Perfil.png";
import Fondo from "../assets/fondo.jpg";
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [prestamos, setPrestamos] = useState([]);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://18.232.46.147/prestamos/prestamos')
      .then(response => response.json())
      .then(data => setPrestamos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleTargetClick = (prestamo) => {
    setShowButtons(true);
    setSelectedPrestamo(prestamo);
  };

  const handleNavigate = () => {
    navigate('/listap');
  };

  const handleLista = () => {
    navigate('/listapr');
  };

  const handleReparar = () => {
    navigate('/reparaciones');
  };

  const handleEstadisticas = () => {
    navigate('/estadisticas');
  };

  return (
    <>
      <nav className='navbar'>
        <div className='nav-links'>
          <a onClick={handleEstadisticas} href="#profesores" className='nav-link'>Estadísticas generales</a>
          <a onClick={handleNavigate} href="#profesores" className='nav-link'>Lista de Profesores</a>
          <a onClick={handleLista} href="#canones" className='nav-link'>Lista de Cañones</a>
          <a href="#reparaciones" onClick={handleReparar} className='nav-link'>Reparaciones</a>
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

      <div className='bodi-home'>
        <div className='part1-home'>
          <header>Cañones en uso:</header>
          <div className='cont-part1-home'>
            {prestamos.map(prestamo => (
              <div key={prestamo.prestamo_id} className='target-home' onClick={() => handleTargetClick(prestamo)}>
                <img style={{ width: 100 }} src={Male} alt="Descripción de la imagen" />
                <a>{`M. ${prestamo.maestro.nombre} ${prestamo.maestro.ape_paterno}`}</a>
                <p>{`Proyector: ${prestamo.proyector.numero_serie}`}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='part2-home'>
          <Sidebar showButtons={showButtons} selectedPrestamo={selectedPrestamo} />
        </div>
      </div>
    </>
  );
};