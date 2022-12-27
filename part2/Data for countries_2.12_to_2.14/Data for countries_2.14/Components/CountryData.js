import React from "react"
const CountryData = ({ country }) => {
    return (
      <>
        <h1>{country?.name}</h1>
        <p>capital {country?.capital}</p>
        <p>area {country?.population}</p>
        <h3>Languages</h3>
        <ul>
          {country?.languages?.map(language => (
            <li key={language?.name}>{language?.name}</li>
          ))}
        </ul>
        <img
          src={country?.flag}
          alt={`${country?.name}\'s flag`}
          style={{ width: "150px" }}
        />
      </>
    )
  }
  
  export default CountryData