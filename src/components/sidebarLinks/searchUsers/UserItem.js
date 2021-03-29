import { Link } from 'react-router-dom';

const UserItem = ({ name, isActive, userId }) => {
  return (
    <div>
      <div style={isActive ? statusStyleOn : statusStyleOff}></div>
      <h3>{name}</h3>
      <Link to={`/users/${userId}`}>View</Link>
    </div>
  )
}

export default UserItem;

const statusStyleOn = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: 'green'
}
const statusStyleOff = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: 'red'
}