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
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };
  
  console.log("base state : " + state)
  console.log(apiData.main)

  return (
    <div className="App">
          {apiData.main ? (
          <div>
            <h1>{apiData.name}</h1>
            <br/>
            <h1>{(apiData.main.temp)}&deg;</h1>
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
