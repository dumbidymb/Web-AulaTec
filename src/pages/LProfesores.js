import '../sources/LP.css';
import '../sources/Home.css';
import Fondo from '../assets/fondo.jpg';
import Male from '../assets/Perfil.png';
import Male2 from '../assets/Male2.png';
import NotificationIcon from '../assets/alarma.png';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LProfesores = () => {
  const [cards, setCards] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isNotifyModalVisible, setIsNotifyModalVisible] = useState(false);
  const [newProfessor, setNewProfessor] = useState({ nombre: '', ape_paterno: '', ape_materno: '', correo: '' });
  const [notifyMessage, setNotifyMessage] = useState('');
  const [currentProfessor, setCurrentProfessor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch professors from the backend
    const fetchProfessors = async () => {
      try {
        const response = await fetch('https://aulatec.zapto.org/maestros/');
        if (response.ok) {
          const data = await response.json();
          setCards(data);
        } else {
          console.error('Failed to fetch professors');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfessors();
  }, []);

  const addCard = async () => {
    try {
      const response = await fetch('https://aulatec.zapto.org/maestros/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProfessor)
      });

      if (response.ok) {
        const professor = await response.json();
        setCards([...cards, professor]);
        setIsAddModalVisible(false);
        setNewProfessor({ nombre: '', ape_paterno: '', ape_materno: '', correo: '' });
      } else {
        console.error('Error adding professor');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedCards([]);
  };

  const handleNavigate = () => {
    navigate('/inicio');
  };

  const toggleCardSelection = (index) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter(i => i !== index));
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };

  const removeSelectedCards = async () => {
    try {
      const response = await fetch('https://aulatec.zapto.org/maestros/delete_multiple', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ maestro_ids: selectedCards.map(i => cards[i].id) })
      });

      if (response.ok) {
        setCards(cards.filter((_, index) => !selectedCards.includes(index)));
        setIsSelectionMode(false);
        setSelectedCards([]);
        setIsModalVisible(false);
      } else {
        console.error('Error deleting professors');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const handleCancelClick = () => {
    setIsModalVisible(false);
  };

  const handleAddClick = () => {
    setIsAddModalVisible(true);
  };

  const handlePhotoChange = () => {
    setNewProfessor({
      ...newProfessor,
      photo: newProfessor.photo === Male ? Male2 : Male
    });
  };

  const handleNotifyClick = (index) => {
    setCurrentProfessor(cards[index]);
    setIsNotifyModalVisible(true);
  };

  const handleSendNotification = () => {
    console.log(`Notificación enviada a ${currentProfessor.nombre}: ${notifyMessage}`);
    setIsNotifyModalVisible(false);
    setNotifyMessage('');
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

      <body className='bodi-lp'>
        <div className="card-container">
          <div className="cards">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`card ${isSelectionMode ? 'selectable' : ''} ${selectedCards.includes(index) ? 'selected' : ''}`}
                onClick={() => isSelectionMode && toggleCardSelection(index)}
              >
                {isSelectionMode && <input type="checkbox" checked={selectedCards.includes(index)} onChange={() => toggleCardSelection(index)} />}
                <img src={card.photo ? card.photo : Male} alt="Avatar" className="avatar" />
                <div className="card-content">
                  <p>{card.nombre} {card.ape_paterno} {card.ape_materno}</p>
                </div>
                <img
                  src={NotificationIcon}
                  alt="Notificar"
                  className="notification-icon"
                  onClick={() => handleNotifyClick(index)}
                />
              </div>
            ))}
          </div>
          <div className="buttons">
            <button onClick={handleAddClick} className="button add">+</button>
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
              <h2>Confirmar Eliminación</h2>
              <p>¿Estás seguro de que quieres eliminar los elementos seleccionados?</p>
              <button onClick={removeSelectedCards}>Sí</button>
              <button onClick={handleCancelClick}>No</button>
            </div>
          </div>
        )}

        {isAddModalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h2>Agregar Profesor</h2>
              <div className='input-group'>
              <input
                type="text"
                placeholder="Nombre"
                value={newProfessor.nombre}
                onChange={(e) => setNewProfessor({ ...newProfessor, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="Apellido Paterno"
                value={newProfessor.ape_paterno}
                onChange={(e) => setNewProfessor({ ...newProfessor, ape_paterno: e.target.value })}
              />
              <input
                type="text"
                placeholder="Apellido Materno"
                value={newProfessor.ape_materno}
                onChange={(e) => setNewProfessor({ ...newProfessor, ape_materno: e.target.value })}
              />
              <input
                type="email"
                placeholder="Correo"
                value={newProfessor.correo}
                onChange={(e) => setNewProfessor({ ...newProfessor, correo: e.target.value })}
              />
              </div>
              <div className="modal-buttons">
              <button onClick={addCard}>Agregar</button>
              <button onClick={() => setIsAddModalVisible(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {isNotifyModalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h2>Enviar Notificación</h2>
              <p>Enviar notificación a {currentProfessor.nombre}:</p>
              <textarea
                value={notifyMessage}
                onChange={(e) => setNotifyMessage(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
              />
              <button onClick={handleSendNotification}>Enviar</button>
              <button onClick={() => setIsNotifyModalVisible(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </body>
    </>
  );
}
