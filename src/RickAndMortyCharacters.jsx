import React, {useState, useEffect} from "react";
import CharacterCard from "./CharacterCard";

const API_URL = 'https://rickandmortyapi.com/api/character';

function RickAndMortyCharacters() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const appContainerStyle = {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '900px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        color: '#333',
    };

    const characterGridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '20px',
    };

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);              
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error('Error HTTP: ' + response.status);
                }
                const data = await response.json();
                setCharacters(data.results);
            } catch (err) {
                console.error('Error al obtener personajes: ', err);
                setError('No pudimos cargar los personajes. Intenta de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

    if (loading) {
        return <p style={{ textAlign: 'center', fontSize: '1.5em', color: '#555' }}>Cargando personajes de Rick and Morty...</p>;
    }

    if (error) {
        return <p style={{ textAlign: 'center', fontSize: '1.5em', color: 'red' }}>{error}</p>;
    }

    return (
        <div style={appContainerStyle}>
            <h1>Primeros 20 Personajes</h1>
            <div style={characterGridStyle}>
                {characters.map((character) => (
                    <CharacterCard key={character.id} character={character}/>
                ))}
            </div>
        </div>
    );
}

export default RickAndMortyCharacters;