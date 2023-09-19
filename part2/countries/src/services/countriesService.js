import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

let allCountries = []

const getAll = async () => {
    if (allCountries.length > 0) {
        return allCountries
    }
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => {
        allCountries = response.data
        return allCountries
    })
}

const getFilteredCountires = (filter) => {
    return getAll().then(countries => countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
}

const getCountry = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

export default { getAll, getFilteredCountires, getCountry }
