import React, { useState } from 'react';
import '../sources/sidebar.css';
import Nohay from "../assets/nohay.png";
import Male from "../assets/male.png";
import Timeline from './Timeline';
import Idcard from './Idcard';
import BarChartComponent from './BarChartComponent';

const Sidebar = ({ showButtons, selectedPrestamo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button onClick={toggleSidebar} className="toggle-btn">
        {isExpanded ? 'Close' : 'Open'} 
      </button>
      {showButtons && selectedPrestamo ? (
        <div className='content-2'>
          <header>
            <img style={{width:100}} src={Male} alt="Descripción de la imagen" />
            <a className='linea'/>
            
          </header>
          <div className='super-sub-cont'>
            <div className='subcont-2'>
              <Timeline selectedPrestamo={selectedPrestamo} />
            </div>
            <div className='subcont-2-1'>
              <div className='bt-subcont'>
                <Idcard selectedPrestamo={selectedPrestamo} />
             
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="content">
          <img src={Nohay} alt="Descripción de la imagen" />
          <p className='parrafo-img-home'>No hay información por mostrar.</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;