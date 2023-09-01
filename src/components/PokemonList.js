import { useEffect, useState } from "react";
import axios from "axios"
import {BiSolidSortAlt} from "react-icons/bi"

function PokemonList(){
    const [data, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')
    // const [ability, setAbility] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const url = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=150";
          try {
            const response = await axios.get(url);
            setData(response.data.results);
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault(); // to prevent form submission
        const searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
        try {
          const response = await axios.get(searchUrl);
          // Restructure the data to match the format of the list data
          setData([{ name: response.data.name, url: response.data.species.url }]);
        } catch (err) {
          console.error(err);
          alert('No such Pokémon found.');
        }
    };
    
    useEffect(() => {
        const fetchedData =async () => {
            const abilityUrl = `https://pokeapi.co/api/v2/ability/`;
            try{
                const response = await axios.get(abilityUrl);
                console.log(response.data)
                // setAbility(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchedData()
    }, [])

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
            // Extract Pokémon ID from the URL
            const id = pokemon.url.split("/")[6];
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

            return (
                <div key={index} className="p-16 border border-slate-300 rounded bg-slate-400 text-white">
                    <img src={imageUrl} alt={pokemon.name} />
                    <p className="font-semibold">{pokemon.name.toUpperCase()}</p>
                </div>
            );
            })}
            </div>
        </div>
    )
}

export default PokemonList