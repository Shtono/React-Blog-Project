const FilterUsers = ({ filter }) => {
  const handleChange = (e) => {
    filter(e.target.value)
  }
  return (
    <div>
      <input type="text" onChange={handleChange} />
    </div>
  );
}

export default FilterUsers;