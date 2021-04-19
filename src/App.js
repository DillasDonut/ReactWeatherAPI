import { useState, useEffect } from 'react';
import './App.css';

//Logo import
import littleRain from './icon/little-rain.png';
import partlyCloud from './icon/partly-cloudy.png';
import rain from './icon/rain.png';
import snow from './icon/snow.png';
import storm from './icon/storm.png';
import sun from './icon/sun.png'


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

  console.log(apiData.weather[0].id)

  function IconRendering(){
    if(apiData.weather[0].id <= "232"){
      return(
        <img src={storm}></img>
      ) 
    } if((apiData.weather[0].id >= "500" && apiData.weather[0].id <= "531") || 
         (apiData.weather[0].id >= "300" && apiData.weather[0].id <= "321")){
      return(
        <img src={rain}></img>
      ) 
    } if(apiData.weather[0].id >= "600" && apiData.weather[0].id <= "622"){
      return(
        <img src={snow}></img>
      ) 
    } if(apiData.weather[0].id == "800" ){
      return(
        <img src={sun}></img>
      ) 
    } if(apiData.weather[0].id >= "801" && apiData.weather[0].id <= "804"){
      return(
        <div>
        <img src={partlyCloud}></img>        
        </div>
      ) 
    } else {
      return(
        <img src={littleRain}></img>
      )
    }
  }


    return (
      <div className="App">
            {apiData.main ? (
              <div>
                <div className="SearchGrid">                  
                  <div class="SGleft"></div>
                  <div class="SGcenter">
                    <div>
                    {httpStatus===404 ? <p>There seems to be a problem with the spelling of the city.</p>
                     : <p>Enter any city name :</p>}
                    </div>
                    <div class="SearchContainer">
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
                  </div>
                  <div class="SGright"></div>
                </div>

                <div class="AppGrid">
                  
                    <div class="AGleft"></div>
                    <div class="AGcenter">
                      <div className="AppContainer">
                          <p className="CityName">{apiData.name}</p>
                          <IconRendering/>   
                          <h2> description : {apiData.weather[0].main}</h2>
                          <h2> 
                            min : {kelvinToFarenheit(apiData.main.temp_min)}&deg;C / 
                            max : {kelvinToFarenheit(apiData.main.temp_max)}&deg;C
                          </h2>
                          <h2> wind : {milesToKm(apiData.wind.speed)} Km/h</h2>
                      </div>
                    <div class="AGright"></div>
                  </div>
                </div>
                

                
              </div>
            ) : (
              <h1>Loading</h1>       
            )} 
      </div>
    );
            
};

export default App;
