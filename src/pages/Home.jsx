import { useState, useEffect, useRef } from "react";

import { meteoAPI } from "../services/meteoAPI";
import { timestampToHourMinutes } from "../services/datesFormat.js";
import styled from "@emotion/styled";

const StyledSearchForm = styled.form`
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
`;

const StyledSubmitButton = styled.input`
  all: unset;
  background-color: var(--main-blue);
  color: var(--grey);
  text-align: center;
  margin: 0.7rem 0;
  padding: 0.5rem;
  transition: all ease-in-out 150ms;
  cursor: pointer;
  &:hover {
    color: #000;
    background-color: var(--dark-blue);
  }
`;

const StyledTextInput = styled.input`
  all: unset;
  border-bottom: 2px solid var(--dark-blue);
  color: #000;
`;

const StyledWeatherContainer = styled.div`
  margin: 3rem auto;
  border: solid var(--main-grey) 2px;
  padding: 1rem;
  border-radius: 15px;
`;

function Home() {
  const [coord, setCoord] = useState(null);
  const [search, setSearch] = useState(localStorage.getItem("city") || "Paris");
  const [data, setData] = useState(null);

  const textInputRef = useRef(null);

  const getCoord = () => {
    meteoAPI
      .get(
        `/geo/1.0/direct?q=${search}&appid=${import.meta.env.VITE_METEO_KEY}`
      )
      .then((res) => {
        if (res.data.length) {
          localStorage.setItem("city", res.data[0].name);

          setCoord(res.data[0]);

          const { lat, lon } = res.data[0];

          meteoAPI
            .get(
              `/data/2.5/weather?lat=${lat}&lon=${lon}&lang=FR&units=metric&appid=${
                import.meta.env.VITE_METEO_KEY
              }`
            )
            .then((res) => setData(res.data));
        } else {
          setCoord(null);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCoord();
  }, []);

  useEffect(() => {
    textInputRef.current.focus();
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    search.length > 1 ? getCoord() : alert("Veuillez saisir un nom de ville");
  };

  const handleTextInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledTextInput
          onChange={handleTextInput}
          type="text"
          name="city"
          id="city"
          ref={textInputRef}
          value={search}
        />
        <StyledSubmitButton type="submit" value="Rechercher" />
      </StyledSearchForm>
      {coord ? (
        <StyledWeatherContainer>
          <p>Ville : {coord.local_names?.fr ?? coord.name}</p>
          {data && (
            <>
              <p>Température : {Math.round(data.main.temp)}°</p>
              <p>
                {data.weather[0].description}
                <img
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  alt="Weather icon"
                ></img>
              </p>
              <p>Levé du soleil : {timestampToHourMinutes(data.sys.sunrise)}</p>
              <p>
                Couché du soleil : {timestampToHourMinutes(data.sys.sunset)}
              </p>
            </>
          )}
        </StyledWeatherContainer>
      ) : (
        <p>Nous n'avons trouvé aucune ville de ce nom.</p>
      )}
    </>
  );
}

export default Home;
