import CountryData from "./CountryData"
import { useState, useEffect } from 'react'
import React from "react"
// still remains a problem is that, when refill the content, the details of one contry don't change, until another button press
const CountryList = ({countries,newFilter}) => {
    const [newCountry, setNewCountry] = useState({})


    // should put condition selection outside of map
    let filtered=countries.filter(country=> country.name.toLowerCase().includes(newFilter.toLowerCase()))
    let length=filtered.length

    const handleClick=(country)=>{ //why {country} is wrong???
        console.log(country)
        setNewCountry(country)
    }
    if(length>10){
        return "Too many matches, specify another filter"
    }
    if(length>1){
        return (
            <>
                {
                    filtered.map(filteredCountry=>(
                        <>
                            <p key={filteredCountry.name}>{filteredCountry.name}</p>
                            <button onClick={()=>handleClick(filteredCountry)}>show</button>
                        </>
                        )
                    )
                }
                {JSON.stringify(newCountry)=="{}"?<></>:<CountryData country={newCountry}/>}
            </>
        )
    }else{
        return <CountryData country={filtered[0]}/>
    }

}
export default CountryList
