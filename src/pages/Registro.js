import React from 'react'
import '../sources/login.css'
import LogoLog from "../assets/LogoLog.png"

export const Registro = () => {
  return (
<>
<body className='boidi'>
    <div className='division-1'>
        <div className='text-log'>

Register
        </div>

<div className='entrar'>
<div class="input-container">
        <input type="text" id="nombre" required/>
        <label for="nombre">Nombre</label>
    </div>
    <div class="input-container">
        <input type="password" id="contrasena" required/>
        <label for="contrasena">Contraseña</label>
    </div>

    <div class="input-container">
        <input type="email" id="contrasena" required/>
        <label for="contrasena">Correo electronico</label>
    </div>
<button className='button-log'>
Registrarse
</button>
</div>
    </div>
    <div className='division-2'>
    <img src={LogoLog} alt="Descripción de la imagen"></img>

    </div>
  </body>
</>
  )
}
