import { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import axios from "axios"
import Filter from "./Components/Filter";
import CountryList from "./Components/CountryList";

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState("") //store the filter condition

  // get and store data
  useEffect(()=>{
    axios
      .get("https://restcountries.com/v2/all")
      .then(response=>{setCountries(response.data)})
  },[])

  console.log(countries.length)


  return (
    <>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <br/>
      <CountryList countries={countries} newFilter={newFilter}/>
    </>
  )
}


export default App