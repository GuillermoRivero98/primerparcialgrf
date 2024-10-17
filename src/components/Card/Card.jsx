import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";


const deletePet = async (id) => {
    const petDelete = await fetch("http://localhost:3005/api/pets/" + id, {
        method: "DELETE",
    });

    return petDelete;
};

const editPet = async (id) => {
    const petEdit = await fetch("http://localhost:3005/api/pets/" + id, {
        method: "PUT",
    });

    return petEdit;
};

const Card = ({ name, id, photo,age, refreshPets }) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/details/${id}`);
    };

    const handleDeleteClick = async () => {
        const response = await deletePet(id);
        if (response.ok) {
            refreshPets();
        }
    };

    const handleInputChange = async () => {
        const response = await editPet(id);
        if (response.ok) {
            refreshPets();
        }
    }

    return (
        <div className="card">
            <div className="card-content">
                <h2 className="card-name">{name}</h2>
                <div className="card-wrapp-buttons">
                    <button className="card-button" onClick={handleDetailsClick}>
                        Detalle
                    </button>
                    <button className="card-button" onClick={handleDeleteClick}>
                        Borrar
                    </button>
                    <button className="card-button" onClick={handleInputChange}>
                        Edit
                    </button>
                    <button className="card-button" >
                        Adoptar
                    </button>
                </div>
            </div>
        </div>

    );
};
export default Card;
