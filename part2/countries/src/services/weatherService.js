import axios from 'axios'

const baseUrl = 'https://api.weatherapi.com/v1/current.json'

const getWeather = (queryParameter) => {
    const queryUrl = `${baseUrl}?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${queryParameter}&aqi=no`
    return axios.get(queryUrl)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.data
        })
}

export default { getWeather }