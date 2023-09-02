function Modal({pokemon, onClose}){
    return (
        <div className="bg-white border-2 border-black fixed top-8 right-8 left-8">
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <h2>{pokemon.name.toUpperCase()}</h2>
            <p>Abilities: {pokemon.abilities.join(', ')}</p>
            <p>Type: {pokemon.type}</p>
            <p>Moves: {pokemon.moves}</p>
            <button onClick={onClose}>Close</button>
        </div>
    )
};

export default Modal;