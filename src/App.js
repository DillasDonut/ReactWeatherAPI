import { useState, useEffect } from 'react';
import './App.css';

//Logo import
import littleRain from './icon/little-rain.png';
import partlyCloud from './icon/partly-cloudy.png';
import rain from './icon/rain.png';
import snow from './icon/snow.png';
import storm from './icon/storm.png';
import sun from './icon/sun.png';
import wind from './icon/wind.png';


function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Paris');
  const [state, setState] = useState('Paris');

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


  function IconRendering(){
    if(apiData.weather[0].id <= "232"){
      return(
        <img className="TempIcon" src={storm}></img>
      ) 
    } if((apiData.weather[0].id >= "500" && apiData.weather[0].id <= "531") || 
         (apiData.weather[0].id >= "300" && apiData.weather[0].id <= "321")){
      return(
        <img className="TempIcon" src={rain}></img>
      ) 
    } if(apiData.weather[0].id >= "600" && apiData.weather[0].id <= "622"){
      return(
        <img className="TempIcon" src={snow}></img>
      ) 
    } if(apiData.weather[0].id == "800" ){
      return(
        <img className="TempIcon" src={sun}></img>
      ) 
    } if(apiData.weather[0].id >= "801" && apiData.weather[0].id <= "804"){
      return(
        <div>
        <img className="TempIcon" src={partlyCloud}></img>        
        </div>
      ) 
    } else {
      return(
        <img className="TempIcon" src={littleRain}></img>
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
                    <div className="ErrorText">
                    {httpStatus===404 ? <p>There seems to be a problem with the spelling of the city.</p>
                     : <p>Enter any city name</p>}
                    </div>
                      <input
                        className="Search"
                        type="text"
                        id="location-name"
                        class="form-control"
                        onChange={inputHandler}
                        value={getState}
                      />
                      <button
                        className="Submit"
                        type="submit"
                        onClick={submitHandler}
                      ><span className="TextBtn">Go</span></button>
                  </div>
                  <div class="SGright"></div>
                </div>

                <div class="AppGrid">            
                    <div class="AGcenter">
                      <div className="AppContainer">
                        <p className="CityName">{apiData.name}</p>
                        <IconRendering/>   
                        <p className="Temp"> {kelvinToFarenheit(apiData.main.temp)}&deg;C</p>
                        <hr/>

                        <div className="TempWindGrid">
                          <div classname="TWleft"> 
                            <p className="MaxMinText"> 
                              {kelvinToFarenheit(apiData.main.temp_min)}&deg;C -
                              {kelvinToFarenheit(apiData.main.temp_max)}&deg;C
                            </p>
                          </div>
                          <div classname="TWright">
                            <img className="WindIcon" src={wind} /> 
                            <p className="WindText">  {milesToKm(apiData.wind.speed)} Km/h</p>
                          </div>
                        </div>
                      </div>
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
