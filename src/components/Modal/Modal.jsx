import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ refreshPets, closeModal }) => {
    const [newPet, setNewPet] = useState({
        name: '',
        age: "",
        type: "",
        description: '',
        characteristics: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPet({ ...newPet, [name]: value });
    };

    const handleAddSport = async () => {
        const response = await fetch("http://localhost:3005/api/pets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPet),
        });

        if (response.ok) {
            await refreshPets(); 
            closeModal(); 
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Agregar Nueva Mascota</h2>
                <label>Nombre</label>
                <input type="text" name="name" value={newPet.name} onChange={handleInputChange} />
                <label>Descripción:</label>
                <input type="text" name="description" value={newPet.description} onChange={handleInputChange} />
                <label>Edad:</label>
                <input type="number" name="age" value={newPet.age} onChange={handleInputChange} min="1" />
                <label>Categorías:</label>
                <input type="text" name="caracteristicas" value={newPet.characteristics} onChange={handleInputChange} />
                <button onClick={handleAddSport}>Agregar Mascota</button>
                <button onClick={closeModal}>Cerrar</button>
            </div>
        </div>
    );
};

export default Modal;
