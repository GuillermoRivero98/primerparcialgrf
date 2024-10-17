import React, { useEffect, useState } from "react";
import "./Details.css";
import { useNavigate, useParams } from "react-router-dom";


const getPetByID = async (id) => {
    const petFetch = await fetch(`http://localhost:3005/api/pets/${id}`);
    const pet = await petFetch.json();
    return pet;
};

const changePetInfo = async (id, updatedPet) => {
    const response = await fetch(`http://localhost:3005/api/pets/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPet),
    });
    return response.json();
};

const Details = () => {
    const [pet, setPet] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [updatedPet, setUpdatedPet] = useState(null);
    

    useEffect(() => {
        getPetByID(id).then((pet) => {
            setPet(pet[0]);
            setUpdatedPet(pet[0]);
        });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPet((prevPet) => ({
            ...prevPet,
            [name]: value,
        }));
    };

    const handleSave = () => {
        changePetInfo(id, updatedPet).then(() => {
            setPet(updatedPet);
            setEditMode(false);
        });
    };

    const handleCancel = () => {
        setUpdatedPet(pet);
        setEditMode(false);
    };

    return (
        <div className="container">
            <h1>Descripción</h1>
            {pet && (
                <div>
                    <div className="home-grid-cards">

                    </div>
                    <div className="detail">
                        <span className="detail-title">Nombre: </span>
                        {editMode ? (
                            <input
                                type="text"
                                name="name"
                                value={updatedPet.name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span className="detail-content">{pet.name}</span>
                        )}
                    </div>
                    <div className="detail">
                        <span className="detail-title">Descripción: </span>
                        {editMode ? (
                            <input
                                type="text"
                                name="description"
                                value={updatedPet.description}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span className="detail-content">{pet.description}</span>
                        )}
                    </div>
                    <div className="detail">
                        <span className="edad-title">Edad </span>
                        {editMode ? (
                            <input
                                type="number"
                                name="edad"
                                value={updatedPet.age}
                                onChange={handleInputChange}
                                min="1"
                            />
                        ) : (
                            <span className="detail-content">{pet.age}</span>
                        )}
                    </div>
                    <div className="detail">
                        <span className="detail-title">Tipo</span>
                        {editMode ? (
                            <input
                                type="text"
                                name="Tipo"
                                value={updatedPet.type}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span className="detail-content">{pet.type}</span>
                        )}
                    </div>
                    <div className="buttons-wrapper">
                        {editMode ? (
                            <>
                                <button onClick={handleSave} className="edit-button">
                                    Guardar
                                </button>
                                <button onClick={handleCancel} className="edit-button">
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setEditMode(true)} className="edit-button">
                                Editar
                            </button>
                        )}
                        <button onClick={() => navigate(-1)} className="back-button">
                            Volver
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
