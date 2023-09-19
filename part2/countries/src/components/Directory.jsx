import { useEffect, useState } from "react"
import countriesService from "../services/countriesService"
import weatherService from "../services/weatherService"
import Country from "./Country"

const Directory = ({ countries }) => {
    const [display, setDisplay] = useState(<div></div>)
    const [country, setCountry] = useState(null)
    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {
        if (countries.length === 0) {
            setDisplay(<p>No countries match filter query</p>)
            setCountry(null)
        } else if (countries.length === 1) {
            setDisplay(<div></div>)
            setCountry(countries[0])
            updateWeatherData(countries[0])
        } else if (countries.length <= 10) {
            setDisplay(countries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={clickHandler(country.name.common)}>show</button></p>))
            setCountry(null)
        } else {
            setDisplay(<p>Too many matches. Specifiy another filter.</p>)
            setCountry(null)
        }
    }, [countries])

    const clickHandler = (name) => () => {
        return countriesService.getCountry(name).then(clickedCountry => {
            setDisplay(<div></div>)
            setCountry(clickedCountry)
            updateWeatherData(clickedCountry)
        })
    }

    const updateWeatherData = (country) => {
        // only query external weather API if looking up a new country
        if (weatherData === null || weatherData === undefined || weatherData[country.name.common] === undefined) {
            console.log("Executing weather service query")
            weatherService.getWeather(country.name.common).then(data => {
                console.log("weather service data")
                console.log(data)
                const countryName = country.name.common
                const newData = {}
                newData[countryName] = data
                setWeatherData(newData)
            }).catch(err => {
                console.log("weather service error")
                console.log(err)
                setWeatherData(err)
            })
        }
    }

    return (
        <div>
            {display}
            <Country countryInput={country} weatherInput={weatherData} />
        </div>
    )
}

export default Directory
