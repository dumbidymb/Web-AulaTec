import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sources/Home.css'
import Fondo from '../assets/fondo.jpg';

export const Reparaciones = () => {
  const navigate = useNavigate();
  
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
            <p>El control esta en tus manos.</p>
          </div>
        </div>
      </div>
</>
  )
}
