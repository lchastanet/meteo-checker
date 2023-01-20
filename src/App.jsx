import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [coord, setCoord] = useState({});
  const [search, setSearch] = useState("Paris");

  const getCoord = () => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${
          import.meta.env.VITE_METEO_KEY
        }`
      )
      .then((res) => {
        res.data.length ? setCoord(res.data[0]) : setCoord(null);
        console.log(res.data[0]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCoord();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    search.length > 1 ? getCoord() : alert("Veuillez saisir un nom de ville");
  };

  const handleTextInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleTextInput} type="text" name="city" id="city" />
        <input type="submit" value="Rechercher" />
      </form>
      {coord ? (
        <>
          <p>Ville : {coord.local_names.fr}</p>
          <p>Latitude : {coord.lat}</p>
          <p>Longitude : {coord.lon}</p>
        </>
      ) : (
        <p>Nous n'avons trouvé aucune ville de ce nom.</p>
      )}
    </>
  );
}

export default App;
