import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sources/login.css';
import LogoLog from "../assets/LogoLog.png";


export const Login = () => {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://18.232.46.147/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: nombre, contrasena: contrasena })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/inicio');
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <div className='boidi'>
        <div className='division-1'>
          <div className='text-log'>Login</div>
          <form className='entrar' onSubmit={handleLogin}>
            <div className="input-container">
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <label htmlFor="nombre">Nombre</label>
            </div>
            <div className="input-container">
              <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
              <label htmlFor="contrasena">Contraseña</label>
            </div>
            <button className='button-log' type="submit">Entrar</button>
          </form>
          <div className="switch-auth">
            <span>¿No tienes cuenta?</span>
            <a href="/registro">Regístrate aquí</a>
          </div>
        </div>
        <div className='division-2'>
          <img src={LogoLog} alt="Descripción de la imagen" />
        </div>
      </div>
    </>
  );
};
