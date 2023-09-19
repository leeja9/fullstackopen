import { useState, useEffect } from 'react'
import Directory from './components/Directory'
import Filter from './components/Filter'
import connector from './services/countriesService'
import './App.css'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    if (filter !== '') {
        connector.getFilteredCountires(filter)
            .then(returnedData => {
                console.log(`fetched ${returnedData.length} countries`)
                setCountries(returnedData)
            })
            .catch(err => console.log(err))
    } else {
        connector.getAll()
            .then(returnedData => {
              setCountries(returnedData)
            })
            .catch(err => console.log(err))
    }
  }, [filter])
  return (
      <div>
          <h2>Country Lookup</h2>
          <Filter filter={filter} setFilter={setFilter} />
          <Directory countries={countries} />
      </div>
  )
}

export default App