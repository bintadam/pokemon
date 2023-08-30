import {useEffect, useState} from "react"


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
    <div className="App">

    </div>
  );
}

export default App;
