import WeatherData from "./WeatherData"
import CountryData from "./CountryData"
import { useEffect, useState } from "react"

const Country = ({ countryInput, weatherInput }) => {
    const [countryData, setCountryData] = useState(null)
    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {
        if (countryInput === null || countryInput === undefined || weatherInput === null || weatherInput === undefined) {
            setCountryData(null)
            setWeatherData(null)
        } else {
            setCountryData(countryInput)
            setWeatherData(weatherInput)
        }
    }, [countryInput, weatherInput])

    return (
        <div>
            <CountryData country={countryData} />
            <WeatherData weatherData={weatherData} />
        </div>
    )
}
export default Country
