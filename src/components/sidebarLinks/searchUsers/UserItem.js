import { Link } from 'react-router-dom';

const UserItem = ({ user }) => {
  const { username, id, isActive, imageUrl, age, city, company } = user;

  // userId={user.id} name={user.username} isActive={user.isActive}
  return (
    <div className="user-item">
      <div className="more-info">
        <p>Age: {age}</p>
        <p>From: {city}</p>
        <p>Works at: {company}</p>
        <p>Status:
           <span className={isActive ? 'status-on' : 'status-off'}>{isActive ? 'Online' : 'Offline'}</span>
        </p>
      </div>
      <img src={imageUrl} alt="User photo" />
      {/* <div className="status" style={isActive ? statusStyleOn : statusStyleOff}></div> */}
      <h3>{username}</h3>
      <Link to={`/users/${id}`}>View Profile</Link>
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