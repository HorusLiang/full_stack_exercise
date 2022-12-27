import CountryData from "./CountryData"
import React from "react"
const CountryList = ({countries,newFilter}) => {
    console.log(countries)

    // should put condition selection outside of map
    let filtered=countries.filter(country=> country.name.toLowerCase().includes(newFilter.toLowerCase()))
    let length=filtered.length
    if(length>10){
        return "Too many matches, specify another filter"
    }
    if(length>1){
        return filtered.map(filteredCountry=>(
             <p key={filteredCountry.name}>{filteredCountry.name}</p>
            )   
        )
    }else{
        return <CountryData country={filtered[0]}/>
    }

}
export default CountryList
