
import React, {useEffect, useState} from 'react';

const Weather = () => {
    //assigning an initial empty state array
    const [weatherData, setWeatherData] = useState([]);
    const [defaultWeatherData, setDefaultWeatherData] = useState([])
    const [defaultCity, setDefaultCity] = useState('')
    const [text, setText] = useState('');
    const [city, setCity] = useState('')
    const [cityText, setCityText] = useState('');

    useEffect(() => { //renders only what you tell it to
        /**
             * @todo create a default waeather city
        */
        console.log('useEffect ran');
        console.log(text);
    },[weatherData, text, cityText]);//[]empty array render page once only

    // const text = 'This is the home Page';

    const handleForm = (e) => {
        e.preventDefault();
        setCityText(text);
        setText('');
        
        const getData = async () => {
            try {
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=imperial&appid=${process.env.REACT_APP_APIKEY}`;
                console.log(url);
        
                let response = await fetch(url); //api call for data
                
                //don't mutate the original object. store response into another variable.
                let data = await response.json(); //format to json object, .json() exchanges data to/from a web server
                // console.log(data);//verify the object
                console.log(data);
                setWeatherData(data);//setting the state to a full object
        
            } catch (error) {
                console.log('Error with API', error);
            };
        };

        getData(text);

    };
    /**
     * @todo 1
     const clearState = () => {
         setWeatherData([]);
        setText('');
        setCityText(''); //stays on screen
    }
    */

    return <>
        <form onSubmit={handleForm} className="form-group container">
            <div>
                <h1>Quick Weather</h1>
                <h2>Search City Name</h2>
                <input className="form-control" type="text" value={text} onChange={(e)=>setText(e.target.value.toUpperCase())} id="input-city" aria-describedby="City" placeholder="Enter City Name"/>
            </div>

            <button type="submit" className="btn-primary rounded" id="btn-submit">
                SUBMIT
            </button>
        </form>

        <br />

        <div className="container rounded-pill d-flex flex-column conditions align-items-center">

            {
                cityText && cityText ?
                <h2 id="city" style={{marginTop: "0px"}}>{cityText}</h2> :
                <h2 id="city" style={{marginTop: "0px"}}>Cupertino</h2>
            }
            
            {
                weatherData.weather && weatherData.weather ? 
                /** 
                 * @todo 1
                 // <p id="pic" style={{marginTop: "0px"}}><img id="icon" src={`http://openweathermap.org/img/wn/${defaultWeatherData.weather[0].icon}@2x.png`} width="250" height="250" alt='weather'/></p> :
                */
                <p id="pic" style={{marginTop: "0px"}}><img id="icon" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} width="250" height="250" alt='weather'/></p> :
                <p id="pic" style={{marginTop: "0px"}}><img id="icon" src="http://openweathermap.org/img/wn/04d@2x.png" width="250" height="250" alt='weather'/></p>  
            }

           {
               weatherData.main && weatherData.main ?
               <h2  id="conditions" style={{marginTop: "0px"}}>{weatherData.main.temp}F {weatherData.weather[0].description}</h2> :
               <h2  id="conditions" style={{marginTop: "0px"}}>45F overcast clouds</h2>
            }

        </div>
    </>;
}
 
export default Weather;