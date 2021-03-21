import { Link } from 'react-router-dom';

const UserItem = ({ name, isActive, userId }) => {
  return (
    <div style={style}>
      <div style={isActive ? statusStyleOn : statusStyleOff}></div>
      <h3>{name}</h3>
      <Link to={`/users/${userId}`} style={btnStyle}>View</Link>
    </div>
  )
}

export default UserItem;

const style = {
  width: '100%',
  marginTop: '10px',
  padding: '5px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)'
}

const btnStyle = {
  fontSize: '15px ',
  color: '#fff'
}

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