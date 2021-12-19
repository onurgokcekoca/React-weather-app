import { useState, useEffect } from "react";

import "./style.css";

function Temp() {
  const [city, setCity] = useState([]);
  const [search, setSearch] = useState("");
  const [searchCity, setSearchCity] = useState("london");

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSearchCity(search);
    setSearch("");
  };

  useEffect(() => {
    const api = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=4759ce779e567c31575576c2157b0420`;
      const response = await fetch(url);
      const doJson = await response.json();
      console.log(doJson);
      setCity(doJson.main);
    };
    api();
  }, [searchCity]);

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="container">
        <div className="input-div">
          <input
            onChange={onChangeHandler}
            value={search}
            className="search-input"
            placeholder="Şehir ismi..."
          ></input>
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
        {!city ? (
          <div className="card undf">
            <p className="undefined">{`"${searchCity.toUpperCase()}" bulunamadı...`}</p>
          </div>
        ) : (
          <div className="card">
            <div className="sky">
              <i className="fas fa-sun"></i>
            </div>
            <div className="information">
              <span>Bugün</span>
              <h2>{searchCity.toUpperCase()}</h2>
              <p>{`Derece ${Math.floor(city.temp - 273.15)}°`}</p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default Temp;
