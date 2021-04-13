import { useState, useEffect } from 'react';
import './App.css';


function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('paris');
  const [state, setState] = useState('paris');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl])

  const inputHandler = (event) => {
    setGetState(event.target.value)
  }

  const submitHandler = () => {
    setState(getState)
  }

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2)
  }

  const milesToKm = (i) => {
    return (i * 1.609).toFixed(1)
  }

  function TempRendering(){
    if(apiData.main.temp <= "283.15"){
      return(
        <h1 color="blue">{kelvinToFarenheit(apiData.main.temp)}&deg;C</h1>
      ) 
    } if (apiData.main.temp > "283.16" && apiData.main.temp <= "293.14" ){
      return (
        <h1 color="green">{kelvinToFarenheit(apiData.main.temp)}&deg;C</h1>
      )
    } else {
      return(
        <h1 color="red">{kelvinToFarenheit(apiData.main.temp)}&deg;C</h1>
      )
    }
  }
  
  console.log("base state : " + state)
  console.log(apiData.weather)

  return (
    <div className="App">
          {apiData.main ? (
          <div>
            <h1>{apiData.name}</h1>
            <TempRendering/>   
            <h1> description : {apiData.weather[0].description}</h1>
            <h1> min : {kelvinToFarenheit(apiData.main.temp_min)} / max : {kelvinToFarenheit(apiData.main.temp_max)}</h1>
            <h1> wind : {milesToKm(apiData.wind.speed)}km/h</h1>
            <br/>
            <input
              type="text"
              id="location-name"
              class="form-control"
              onChange={inputHandler}
              value={getState}
            />
            <button onClick={submitHandler}>
              Search
            </button>
          </div>

          ) : (
            <h1>Loading</h1>
          )}
    </div>
  );

};

export default App;
