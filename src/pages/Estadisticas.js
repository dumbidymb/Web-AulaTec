import '../sources/Home.css'
import '../sources/LP.css'
import Fondo from "../assets/fondo.jpg";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Histograma from '../components/Histograma';
import Barras from '../components/Barras';

import "../sources/estadisticas.css"
import Dispersion from '../components/Dispersion';

export const Estadisticas = () => {

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
<body className='bodi-estadistica'>
<div className='part-1'>
<div className='part-profe'>
<a>Profesores</a>
<div className='cont-graficas-prof'>
<div className='grafica-histo'>
<Histograma/>
</div>
<div className='grafica-barras'>
  <Barras/>
</div>

<div className='grafica-dispersion'>
  <Dispersion/> 
</div>


</div>
</div>
</div>
<div className='part-2'>
<div className='part-proyector'>
<a>Proyectores</a>
<div className='cont-graficas-proy'>


</div>
</div>
</div>
</body>
</>
  )
}
