function Modal({pokemon, onClose}){
    return (
        <div className="bg-slate-50 border-2 border-slate-100 fixed top-64 left-96 p-6 w-2/5 drop-shadow-2xl rounded-lg">
            <div className="px-32">
                <img src={pokemon.imageUrl} alt={pokemon.name} />
            </div>
            <p className="text-medium font-bold">Name: <span className="text-base font-light text-slate-600">{pokemon.name}</span></p>
            <p className="text-medium font-bold">Description: <span className="text-base font-light text-slate-600">{pokemon.description}</span></p>
            <p className="text-medium font-bold">Abilities: <span className="text-base font-light text-slate-600">{pokemon.abilities.join(', ')}</span></p>
            <p className="text-medium font-bold">Type: <span className="text-base font-light text-slate-600">{pokemon.type}</span></p>
            <p className="text-medium font-bold">Moves: <span className="text-base font-light text-slate-600">{pokemon.moves}</span></p>
            <button className="bg-slate-600 px-6 py-2 rounded mt-3 text-white font-semibold uppercase" onClick={onClose}>Close</button>
        </div>
    )
};

export default Modal;