import { useEffect, useState } from "react";
import axios from "axios"
import {BiSolidSortAlt} from "react-icons/bi"
import Modal from "./Modal";

function PokemonList(){
    const [data, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModel] = useState(false)
    const [currentPokemon, setCurrentPokemon] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
          const url = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=150";
          try {
            const response = await axios.get(url);
            const pokemonsData = await Promise.all(
              response.data.results.map(async (pokemon) => {
                const detailedPokemonData = await axios.get(pokemon.url);
                return {
                  name: detailedPokemonData.data.name,
                  url: pokemon.url,
                  imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detailedPokemonData.data.id}.png`,

                  abilities: detailedPokemonData.data.abilities.map(abilityObj => abilityObj.ability.name),

                  type: detailedPokemonData.data.types.map(type=> type.type.name).join (''),
                  moves: detailedPokemonData.data.moves.map(move=>move.move.name).slice(0, 10).join(', '),
                };
              })
            );
            setData(pokemonsData);
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
    }, []);

    const handleClick = (pokemon) => {
      console.log("Pokemon clicked:", pokemon.name);
      setCurrentPokemon(pokemon);
      setShowModel(true);
    }

    const handleCloseModal = () => {
      setShowModel(false)
    }

    const handleSearch = async (e) => {
        e.preventDefault(); // to prevent form submission
        const searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
        try {
          const response = await axios.get(searchUrl);

          setData([
            { 
                name: response.data.name, 
                url: response.data.species.url,
            }
        ]);
        } catch (err) {
          console.error(err);
          alert('No such Pokémon found.');
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="">
            <form className="flex place-content-center mb-12 " onSubmit={handleSearch}>
                <input className="border border-slate-400 focus:outline-none mr-1 w-1/3 pl-4" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className="text-white bg-slate-600 py-2 px-6 rounded-sm mr-1" type="submit">Search</button>
                <button className="bg-slate-600 py-2 px-4 rounded-sm">
                    <BiSolidSortAlt className="text-white"/>
                </button>
            </form>

            <div className="grid grid-cols-6 gap-2">
            {data.map((pokemon, index) => {

            return (
                <div key={index} className="border border-slate-300 rounded bg-slate-800 " onClick={() => handleClick(pokemon)}>
                    <img className="px-12 py-6" src={pokemon.imageUrl} alt={pokemon.name} />
                    <p className="font-extralight text-white p-4 text-sm">{pokemon.name.toUpperCase()}</p>
                    {/* <p>Abilities: {pokemon.abilities.join(', ')}</p>
                    <p>Moves: {pokemon.moves}</p> */}
                </div>
            );
            })}

            </div>
            { showModal && <Modal pokemon={currentPokemon} onClose={handleCloseModal}/>}

        </div>
    )
}

export default PokemonList