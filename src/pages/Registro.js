import React, { useState } from 'react';
import '../sources/login.css';
import LogoLog from "../assets/LogoLog.png";

export const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [correo, setCorreo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://18.232.46.147/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: nombre, contrasena, correo })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registro exitoso:', data);
      } else {
        console.error('Error en el registro');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='boidi'>
        <div className='division-1'>
          <div className='text-log'>Register</div>
          <form className='entrar' onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                id="nombre"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <label htmlFor="nombre">Nombre</label>
            </div>
            <div className="input-container">
              <input
                type="password"
                id="contrasena"
                required
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
              <label htmlFor="contrasena">Contraseña</label>
            </div>
            <div className="input-container">
              <input
                type="email"
                id="correo"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <label htmlFor="correo">Correo electronico</label>
            </div>
            <button className='button-log' type="submit">Registrarse</button>
          </form>
          <div className="switch-auth">
            <span>¿Ya tienes cuenta?</span>
            <a href="/">Inicia sesión aquí</a>
          </div>
        </div>
        <div className='division-2'>
          <img src={LogoLog} alt="Descripción de la imagen" />
        </div>
      </div>
    </>
  );
};
