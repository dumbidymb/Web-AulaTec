import '../sources/Home.css'
import '../sources/LP.css'
import Fondo from "../assets/fondo.jpg";
import Male from "../assets/Perfil.png";
import React, { useState } from 'react';

export const LProfesores = () => {
  const [cards, setCards] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addCard = () => {
    setCards([...cards, cards.length + 1]);
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

  const removeSelectedCards = () => {
    setCards(cards.filter((_, index) => !selectedCards.includes(index)));
    setIsSelectionMode(false);
    setSelectedCards([]);
    setIsModalVisible(false);
  };

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const handleCancelClick = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='nav-links'>
          <a href="#profesores" className='nav-link'>Regresar</a>
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
                <img src={Male} alt="Avatar" className="avatar" />
              </div>
            ))}
          </div>
          <div className="buttons">
            <button onClick={addCard} className="button add">+</button>
            <button onClick={toggleSelectionMode} className="button remove">🗑️</button>
            {isSelectionMode && (
              <>
                <button onClick={handleDeleteClick} className="button delete">Eliminar</button>
                <button onClick={toggleSelectionMode} className="button cancel">Cancelar</button>
              </>
            )}
          </div>
        </div>
        {isModalVisible && (
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
