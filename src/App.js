import {useEffect, useState} from "react"
import axios from "axios"

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon"
    axios
      .get(url)
      .then((response) => {
      setData(response.data)
    })
      .catch((err) => {
        console.error(err)
    });

  }, []) 

  return (
    <div className="">
      {data.length > 0 ? (
        data.map((pokemon) => (
          <div key={pokemon.id} >

          </div>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default App;
