import React, {useState, useEffect, useCallback} from "react";
import CharacterCard from "./CharacterCard";
import PaginationControls from "./PaginationControls";

const API_URL = 'https://rickandmortyapi.com/api/character/';

function RickAndMortyCharacters() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationInfo, setPaginationInfo] = useState(null);

    const fetchCharacters = useCallback(async () => {
        setLoading(true);
        setError(null);
        let url = `${API_URL}?page=${currentPage}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 404 && currentPage > (paginationInfo?.pages || 0)) {
                    setError("No hay más paginas disponibles");
                    setCharacters([]);
                    setPaginationInfo(prev => ({ ...prev, next: null }));
                    setLoading(false);
                    return;
                }
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            setCharacters(data.results || []);
            setPaginationInfo(data.info);
        } 
        catch (err) {
            console.error("Error al obtener personajes: ", err);
            setError(err.message);
            setCharacters([]);
            setPaginationInfo(null);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

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
        fetchCharacters();
    }, [fetchCharacters])

    if (loading) {
        return <p style={{ textAlign: 'center', fontSize: '1.5em', color: '#555' }}>Cargando personajes de Rick and Morty...</p>;
    }

    if (error) {
        return <p style={{ textAlign: 'center', fontSize: '1.5em', color: 'red' }}>{error}</p>;
    }

    const handleNextPage = () => {
        if (paginationInfo && paginationInfo.next) {
            setCharacters([]);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }

    const handlePrevPage = () => {
        if(currentPage > 1) {
            setCharacters([]);
            setCurrentPage((prevPage) => prevPage - 1);
        }
    }

    return (
        <div style={appContainerStyle}>
            <h1>Personajes De Rick And Morty</h1>
            <div style={characterGridStyle}>
                {characters.map((character) => (
                    <CharacterCard 
                        key={character.id} 
                        character={character}
                    />
                ))}
            </div>
            {
                !error && (
                    <PaginationControls
                        onPrevPage={handlePrevPage}
                        onNextPage={handleNextPage}
                        currentPage={currentPage}
                        isLoading={loading}
                        hasPrev={currentPage > 1}
                        hasNext={paginationInfo?.next !== null}
                    />
                )
            }
        </div>
    );
}

export default RickAndMortyCharacters;