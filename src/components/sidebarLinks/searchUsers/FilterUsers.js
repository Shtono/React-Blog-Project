const FilterUsers = ({ filter }) => {
  const handleChange = (e) => {
    filter(e.target.value)
  }
  return (
    <div className="filter-users">
      <input type="text" placeholder="Type to search" onChange={handleChange} />
    </div>
  );
}

export default FilterUsers;