const WeatherData = ({ weatherData }) => {
    if (weatherData === undefined || weatherData === null) {
        return null
    }

    const data = Object.values(weatherData)[0]

    if (data.error !== undefined) {
        return (
            <div>
                <h2>Current weather unavailable</h2>
                <p>{data.error.message}</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Current weather in {data.location.country}</h2>
            <p><img src={data.current.condition.icon} /></p>
            <p>Current Condition: {data.current.condition.text}</p>
            <p>Local Time: {data.location.localtime}</p>
            <p>Temperature: {data.current.temp_c} C</p>
            <p>Wind Speed: {data.current.wind_dir} {data.current.wind_kph} kph</p>
        </div>
    )
}
export default WeatherData
