import { useEffect, useState } from "react";
import axios from "axios"
import {useMediaQuery} from 'react-responsive';
import {BiSolidSortAlt} from "react-icons/bi"
import { RingLoader } from 'react-spinners';
import Modal from "./Modal";

function PokemonList(){
    const [data, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModel] = useState(false)
    const [currentPokemon, setCurrentPokemon] = useState(null);
    const [sort, setSort] = useState(false)
    const isDesktop = useMediaQuery({query: "(min-width : 1224px)"});
    const isMobile = useMediaQuery({query: '(max-width: 1223px )'})

    useEffect(() => {
        const fetchData = async () => {
          const url = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=150";
          try {
            const response = await axios.get(url);
            const pokemonsData = await Promise.all(
              response.data.results.map(async (pokemon) => {
                const detailedPokemonData = await axios.get(pokemon.url);
                const speciesData = await axios.get(detailedPokemonData.data.species.url);
                const description = speciesData.data.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;

                const stats = detailedPokemonData.data.stats.map(statObj => {
                  return {
                    name: statObj.stat.name,
                    value: statObj.base_stat
                  };
                });

                return {
                  name: detailedPokemonData.data.name,
                  url: pokemon.url,
                  imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detailedPokemonData.data.id}.png`,

                  abilities: detailedPokemonData.data.abilities.map(abilityObj => abilityObj.ability.name),
                  description: description,
                  type: detailedPokemonData.data.types.map(type=> type.type.name).join (''),
                  moves: detailedPokemonData.data.moves.map(move=>move.move.name).slice(0, 10).join(', '),
                  sprite: detailedPokemonData.data.sprite,
                  stats: stats
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

    const handleSort = (e) => {
      e.preventDefault()
      const sortedData =[...data]
      if (sort) {
        // If 'sort' is true, sort in descending order
        sortedData.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        // Else, sort in ascending order
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
      }
      setData(sortedData)
      setSort(!sort)
    }


    if (!data) {
        return <div className="border-t-5 border-gray-300 border-solid rounded-full w-12 h-12 animate-spin  flex place-content-center"><RingLoader/></div>;
    }
    
    return (
      <div className="">
        {isDesktop && ( 
          <div className="px-12 py-16">    
            <form className="flex place-content-center mb-12 " onSubmit={handleSearch}>
                <input className="border border-slate-400 focus:outline-none mr-1 w-1/3 pl-4" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className="text-white bg-slate-600 py-2 px-6 rounded-sm mr-1" type="submit">Search</button>
                <button className="bg-slate-600 py-2 px-4 rounded-sm" onClick={handleSort}>
                    <BiSolidSortAlt className="text-white"/>
                </button>
            </form>

            <div className="grid grid-cols-6 gap-2">
              {data.map((pokemon, index) => {

                return (
                    <div key={index} className="border border-slate-300 rounded bg-slate-100 " onClick={() => handleClick(pokemon)}>
                        <img className="px-12 py-6" src={pokemon.imageUrl} alt={pokemon.name} />
                        <p className="font-extralight text-black p-4 text-sm">{pokemon.name.toUpperCase()}</p>
                    </div>
                );
            })}
            </div>
            { showModal && <Modal pokemon={currentPokemon} onClose={handleCloseModal}/>}
          </div>
        )}
        {isMobile && (  
          <div className="px-6 py-3">   
            <form className="mb-4" onSubmit={handleSearch}>
                <input className="border border-slate-400 focus:outline-none mr-1 w-2/3 p-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className="text-white font-sm  bg-slate-600 py-2 px-4 rounded-sm mr-1" type="submit">Search</button>
                <button className="bg-slate-600 mb-2 pt-2.5 pb-3.5 px-4 rounded-sm " onClick={handleSort}>
                    <BiSolidSortAlt className="text-white w-6"/>
                </button>
            </form>

            <div className="grid grid-cols-2 gap-2">
            {data.map((pokemon, index) => {

            return (
                <div key={index} className="border border-slate-300 rounded bg-slate-100 " onClick={() => handleClick(pokemon)}>
                    <img className="px-12 py-4" src={pokemon.imageUrl} alt={pokemon.name} />
                    <p className="font-extralight text-black p-3 text-sm">{pokemon.name.toUpperCase()}</p>
                </div>
            );
            })}

            </div>
            { showModal && <Modal pokemon={currentPokemon} onClose={handleCloseModal}/>}
          </div>
        )}
      </div>
    )
}

export default PokemonList