import '../sources/Home.css';
import '../sources/LP.css';
import Fondo from "../assets/fondo.jpg";
import CAñom from "../assets/cañon.png";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LProyectores = () => {
  const [cards, setCards] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isToggleStatusModalVisible, setIsToggleStatusModalVisible] = useState(false);
  const [newProjector, setNewProjector] = useState({ marca: '', numero_serie: '', lumens: '', status: '' });
  const [selectedCardForToggle, setSelectedCardForToggle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectors = async () => {
      try {
        const response = await fetch('http://localhost:5000/proyectores');
        if (response.ok) {
          const data = await response.json();
          setCards(data);
        } else {
          console.error('Failed to fetch projectors');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProjectors();
  }, []);

  const addCard = async () => {
    try {
      const response = await fetch('http://localhost:5000/proyectores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          marca: newProjector.marca,
          numero_serie: newProjector.numero_serie,
          lumens: newProjector.lumens,
          status: newProjector.status || 'habilitado'
        })
      });

      if (response.ok) {
        const proyector = await response.json();
        setCards([...cards, proyector]);
        setIsAddModalVisible(false);
        setNewProjector({ marca: '', numero_serie: '', lumens: '', status: '' });
      } else {
        console.error('Error adding projector');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedCards([]);
  };

  const toggleCardSelection = (id) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter(i => i !== id));
    } else {
      setSelectedCards([...selectedCards, id]);
    }
  };

  const handleNavigate = () => {
    navigate('/inicio');
  };

  const handleDeleteClick = () => {
    setIsDeleteModalVisible(true);
  };

  const handleCancelClick = () => {
    setIsAddModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsToggleStatusModalVisible(false);
  };

  const deleteSelectedCards = async () => {
    try {
      await Promise.all(selectedCards.map(async (id) => {
        const response = await fetch(`http://localhost:5000/proyectores/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error(`Failed to delete projector with id ${id}`);
        }
      }));
      setCards(cards.filter(card => !selectedCards.includes(card.id)));
      setIsDeleteModalVisible(false);
      setIsSelectionMode(false);
      setSelectedCards([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToggleStatusClick = (card) => {
    setSelectedCardForToggle(card);
    setIsToggleStatusModalVisible(true);
  };

  const toggleStatus = async () => {
    if (!selectedCardForToggle) return;
  
    try {
      const updatedStatus = selectedCardForToggle.status === 'habilitado' ? 'deshabilitado' : 'habilitado';
      const response = await fetch(`http://localhost:5000/proyectores/toggle_status/${selectedCardForToggle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: updatedStatus }) 
      });
  
      if (response.ok) {
        const proyector = await response.json();
        setCards(cards.map(card => card.id === proyector.id ? { ...card, status: proyector.status } : card));
        setIsToggleStatusModalVisible(false);
      } else {
        console.error('Error updating status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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

      <div className='bodi-lp'>
        <div className="card-container">
          <div className="cards">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`card ${isSelectionMode ? 'selectable' : ''} ${selectedCards.includes(card.id) ? 'selected' : ''}`}
                onClick={() => isSelectionMode && toggleCardSelection(card.id)}
              >
                {isSelectionMode && <input type="checkbox" checked={selectedCards.includes(card.id)} onChange={() => toggleCardSelection(card.id)} />}
                <img src={CAñom} alt="Avatar" className="avatar" />
                <div className="card-content">
                  <p>Marca: {card.marca}</p>
                  <p>Número de Serie: {card.numero_serie}</p>
                  <p>Lumens: {card.lumens}</p>
                  <button className={`viñeta ${card.status === 'habilitado' ? 'green' : 'red'}`} onClick={() => handleToggleStatusClick(card)}></button>
                </div>
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
                    value={newProjector.marca}
                    onChange={(e) => setNewProjector({ ...newProjector, marca: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Número de serie"
                    value={newProjector.numero_serie}
                    onChange={(e) => setNewProjector({ ...newProjector, numero_serie: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Lumen"
                    value={newProjector.lumens}
                    onChange={(e) => setNewProjector({ ...newProjector, lumens: e.target.value })}
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
                <button onClick={deleteSelectedCards} className="modal-button yes">Sí</button>
                <button onClick={handleCancelClick} className="modal-button no">No</button>
              </div>
            </div>
          </div>
        )}
        {isToggleStatusModalVisible && (
          <div className="modal">
            <div className="modal-content">
              <p>¿Estás seguro de que quieres {selectedCardForToggle?.status === 'habilitado' ? 'deshabilitar' : 'habilitar'} este cañón?</p>
              <div className="modal-buttons">
                <button onClick={toggleStatus} className="modal-button yes">Sí</button>
                <button onClick={handleCancelClick} className="modal-button no">No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
