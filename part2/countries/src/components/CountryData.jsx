const CountryData = ({ country }) => {
    if (country === undefined || country === null) {
        return null
    }

    return (
        <div>
            <h2 key="countryName">{country.name.common}</h2>
            <p key="capital">Capital: {country.capital[0]}</p>
            <p key="area">Area: {country.area}</p>
            <p key="lang">Languages:</p>
            {Object.values(country.languages).map(val => <li key={val}>{val}</li>)}
            <img key="flag" src={country.flags.png} />
        </div>
    )
}
export default CountryData
