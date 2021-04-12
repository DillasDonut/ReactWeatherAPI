import { useState, useEffect } from 'react';
import './App.css';


function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [state] = useState('paris');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  
  console.log(state)
  console.log(apiData.main)

  return (
    <div className="App">
          {apiData.main ? (
            <p>{(apiData.main.temp)}&deg;</p>
          ) : (
            <h1>Loading</h1>
          )}
    </div>
  );

};

export default App;
