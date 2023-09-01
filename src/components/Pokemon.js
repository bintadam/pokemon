import { useState } from "react";
import axios from "axios"

function Pokemon(){
    const [searchTerm, setSearchTerm] = useState('')

    const handleClick = (e) => {
      e.preventDefault();
      const search = `https://pokeapi.co/api/v2/pokemon?q=${searchTerm}` 
      axios
        .get(search)
        .then((response) => { 
          const searchedPokemon = {
            url:`https://pokeapi.co/api/v2/pokemon/{id or name}/`
          }
          setSearchTerm(searchedPokemon)
        })
        .catch((err) => {
          console.error(err)
  
        })
    }

    return (
        <div className="px-12 py-16">
            <form className="flex place-content-center mb-12 ">
                <input className="border border-slate-400 focus:outline-none mr-4 w-1/3 pl-4" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className="text-white bg-slate-600 py-2 px-6 rounded" onClick={handleClick}>Search</button>
            </form>
        </div>
    )
}

export default Pokemon;