import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal"; 


const getPets = async () => {
    const petsFetch = await fetch("http://localhost:3005/api/pets");
    const pets = await petsFetch.json();
    return pets;
};

const Home = () => {
    const [pets, setPets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const refreshPets = async () => {
        const updatedPets = await getPets();
        setPets(updatedPets);
    };

    useEffect(() => {
        refreshPets();
    }, []);

    const handleAddPetClick = () => {
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false); 
    };

    return (
        <div>
            <div className="home-title-wrapp">
                <h1>Mascotas</h1>
                <button onClick={handleAddPetClick} className="add-pet-button">
                    Agregar Mascota
                </button>
            </div>
            {pets.length ? (
                <div className="home-grid-cards">
                    {pets.map((pet) => (
                        <Card
                            key={pet.id}
                            name={pet.name}
                            age = {pet.age}
                            id={pet.id}
                            photo={pet.photo}
                            refreshPets={refreshPets}
                        />
                    ))}
                </div>
            ) : (
                <div className="home-no-pets">No hay mascotas para mostrar</div>
            )}

            {isModalOpen && <Modal refreshPets={refreshPets} closeModal={closeModal} />}

        </div>
    );
};

export default Home;
