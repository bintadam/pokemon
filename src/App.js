import {useEffect, useState} from "react"
import axios from "axios"

function App() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
    const search = `https://pokeapi.co/api/v2/pokemon?q=${searchTerm}`
    axios
      .get(url, search)
      .then((response) => {
        // console.log(response.data)
        setData(response.data.results)
    
    })
      .catch((err) => {
        console.error(err)
    });
    axios
      .get(search)
      .then((response) => {
        setSearchTerm(searchTerm)
      })
  }, []) 

  if(!data){
    return <div>Loading...</div>
  }

  return (
    <div className="px-12 py-16">
      <form className="flex place-content-center mb-12 ">
        <input className="border border-slate-400 focus:outline-none mr-4 w-1/3 pl-4"/>
        <button className="text-white bg-slate-600 py-2 px-6 rounded" on>Search</button>
      </form>
      <div className="grid grid-cols-5 gap-10">
        {data.map((pokemon, index) => {
          // Extract Pokémon ID from the URL
          const id = pokemon.url.split("/")[6];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <div key={index} className="p-16 border border-slate-300 rounded-lg">
              <img src={imageUrl} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App;
