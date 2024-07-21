import '../sources/Home.css'
import '../sources/LP.css'
import Fondo from "../assets/fondo.jpg";
import CAñom from "../assets/cañon.png";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LProyectores = () => {
  const [cards, setCards] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [newProjector, setNewProjector] = useState({ name: '', details: '' });
  const navigate = useNavigate();

  const addCard = () => {
    setCards([...cards, { ...newProjector, id: cards.length + 1 }]);
    setNewProjector({ name: '', details: '' }); // Reset the new projector form
    setIsAddModalVisible(false);
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedCards([]); // Reset selected cards when entering/exiting selection mode
  };

  const toggleCardSelection = (index) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter(i => i !== index));
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };

  const handleNavigate = () => {
    navigate('/inicio');
  };

  const removeSelectedCards = () => {
    setCards(cards.filter((_, index) => !selectedCards.includes(index)));
    setIsSelectionMode(false);
    setSelectedCards([]);
    setIsDeleteModalVisible(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalVisible(true);
  };

  const handleCancelClick = () => {
    setIsAddModalVisible(false);
    setIsDeleteModalVisible(false);
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

      <body className='bodi-lp'>
        <div className="card-container">
          <div className="cards">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card ${isSelectionMode ? 'selectable' : ''} ${selectedCards.includes(index) ? 'selected' : ''}`}
                onClick={() => isSelectionMode && toggleCardSelection(index)}
              >
                {isSelectionMode && <input type="checkbox" checked={selectedCards.includes(index)} onChange={() => toggleCardSelection(index)} />}
                <img src={CAñom} alt="Avatar" className="avatar" />
              <div className='viñeta'></div>
              </div>
            ))}  
          </div>
          <div className="buttons">
            <button onClick={() => setIsAddModalVisible(true)} className="button add">+</button>
            <button onClick={toggleSelectionMode} className="button remove">🗑️</button>
            {isSelectionMode && (
              <>
                <button onClick={handleDeleteClick} className="button delete">Eliminar</button>
                <button onClick={toggleSelectionMode} className="button cancel">Cancelar</button>
              </>
            )}
          </div>
        </div>
        {isAddModalVisible && (
          <div className="modal">
            <div className="modal-content">
              <p>Agregar un nuevo proyector</p>
              <div className="modal-form">
                <img src={CAñom} alt="Avatar" className="avatar" />
                <div className='input-group'>
            
                  <input
                    type="text"
                    placeholder="Marca"
                    
                    onChange={(e) => setNewProjector({  details: e.target.value })}
                  />
                    <input
                    type="text"
                    placeholder="Numero de serie"
                  
                    onChange={(e) => setNewProjector({  details: e.target.value })}
                  />
                    <input
                    type="text"
                    placeholder="Lumen"
                 
                    onChange={(e) => setNewProjector({  details: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-buttons">
                <button onClick={addCard} className="modal-button yes">Añadir</button>
                <button onClick={handleCancelClick} className="modal-button no">Cancelar</button>
              </div>
            </div>
          </div>
        )}
        {isDeleteModalVisible && (
          <div className="modal">
            <div className="modal-content">
              <p>¿Estás seguro de que quieres eliminar las tarjetas seleccionadas?</p>
              <div className="modal-buttons">
                <button onClick={removeSelectedCards} className="modal-button yes">Sí</button>
                <button onClick={handleCancelClick} className="modal-button no">No</button>
              </div>
            </div>
          </div>
        )}
      </body>
    </>
  );
};
