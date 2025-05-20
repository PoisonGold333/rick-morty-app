import React from "react";

function CharacterCard({ character }) {
    return (
        <div style={cardStyle}>
            <img src={character.image} alt={character.name} style={imageStyle} />
            <h3 style={{margin: '10px 0'}}>{character.name}</h3>
            <p>Estado: {character.status}</p>
            <p>Especie: {character.species}</p>
        </div>
    );
}

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        margin: '10px',
        width: '200px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        color: '#333',
    };

    const imageStyle = {
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        objectFit: 'cover'
    };

export default CharacterCard;
