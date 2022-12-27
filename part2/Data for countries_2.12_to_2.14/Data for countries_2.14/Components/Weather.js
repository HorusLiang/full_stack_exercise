import React, { useState, useEffect } from "react"
import axios from "axios"

const Weather = (nation) => {
    
    const api_key = process.env.REACT_APP_API_KEY
    // console.log("nation.name is",nation?.nation)
    console.log("nation.name is",nation)
    console.log("nation.name is",nation.nation)
    console.log("nation.name is",nation.nation?.name) //"2a2445d526d32028ed2c2f0ce634d3c4"
    const [newWhether, setNewWhether] = useState({"observation_time":"10:24 PM","temperature":25,"weather_code":113,"weather_icons":["https:\/\/cdn.worldweatheronline.com\/images\/wsymbols01_png_64\/wsymbol_0001_sunny.png"],"weather_descriptions":["Sunny"],"wind_speed":26,"wind_degree":220,"wind_dir":"SW","pressure":1013,"precip":0,"humidity":34,"cloudcover":0,"feelslike":25,"uv_index":6,"visibility":10,"is_day":"yes"})
    useEffect(()=>{
        axios
          .get("http://api.weatherstack.com/current",{
            params:{
                access_key: api_key,
                query:nation?.nation?.name
            }
          })
          .then(response=>{setNewWhether(response.data.current);console.log("response",response)})
          
          
      },[nation.nation?.name]) //change when name is changed
    console.log("newWhether",newWhether)
    return (
        <>
            <h1>Weather in {nation.nation?.name}</h1>
            {/* // different inside the label or in useEffect !!! */}
            temperature <>{newWhether?.temperature}</>  Celcius
            <br/>
            <img
            src={JSON.stringify(newWhether)=="{}"? "":newWhether?.weather_icons[0]}
            alt={`${newWhether?.name}\'s flag`}
            style={{ width: "150px" }}
            />
            <br/>
            wind <> {newWhether?.wind_speed}</>
        </>
        
    )
    // return <p>{nation.nation?.name}</p>
}
export default Weather