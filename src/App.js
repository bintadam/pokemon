import {useEffect, useState} from "react"
import axios from "axios"

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data)
        setData(response.data.results)
    
    })
      .catch((err) => {
        console.error(err)
    });

  }, []) 

  if(!data){
    return <div>Loading...</div>
  }

  return (
    <div className="">
      {data.map((pokemon, index) => {
        // Extract Pokémon ID from the URL
        const id = pokemon.url.split("/")[6];
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return (
          <div key={index}>
            <img src={imageUrl} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        );
      })}
    </div>
  )
}

export default App;
