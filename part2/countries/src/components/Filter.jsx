const Filter = ({ filter, setFilter }) => {
    const handleFilterChange = (event) => {
        event.preventDefault()
        setFilter(event.target.value)
    }
    return (
        <div>
            Filter countries: <input value={filter} onChange={handleFilterChange} />
        </div>
    )
}
export default Filter
