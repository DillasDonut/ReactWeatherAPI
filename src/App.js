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
  
  //HTTP STATUS
  var http = new XMLHttpRequest();
  http.open('HEAD', apiUrl, false);
  http.send();
  const httpStatus = http.status

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
    .then(async (res) => {
      if(res.ok){     
        const data = await res.json();
        return setApiData(data);
      }
    })
  }, [apiUrl, setApiData])


 

  const inputHandler = (event) => {
    setGetState(event.target.value)
  }

  const submitHandler = () => {
    setState(getState)
  }

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(1)
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

    return (
      <div className="App">
            {apiData.main ? (
              <div>               
                <span className="LeftDot"></span>
                <span className="RightDotTwo"></span>
                <span className="RightDotOne"></span>

                <div className="SearchGrid">                  
                  <div class="SGleft"></div>
                  <div class="SGcenter">
                    <div>
                    {httpStatus===404 ? <p>There seems to be a problem with the spelling of the city.</p> : <p>Enter any city name :</p>}
                    </div>
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
                  <div class="SGright"></div>
                </div>

                <div class="AppGrid">
                  <div class="AGleft"></div>
                  <div class="AGcenter">
                    <h1>{apiData.name}</h1>
                    <TempRendering/>   
                    <h2> description : {apiData.weather[0].description}</h2>
                    <h2> 
                      min : {kelvinToFarenheit(apiData.main.temp_min)}&deg;C / 
                      max : {kelvinToFarenheit(apiData.main.temp_max)}&deg;C
                    </h2>
                    <h2> wind : {milesToKm(apiData.wind.speed)} Km/h</h2>
                  </div>
                  <div class="AGright"></div>
                </div>

                

                
              </div>
            ) : (
              <h1>Loading</h1>       
            )} 
      </div>
    );
            
};

export default App;
