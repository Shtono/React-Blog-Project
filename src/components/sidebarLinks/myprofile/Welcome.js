import unnamed from '../../../assets/img/unnamed.png'
const Welcome = ({ displayName, email, showUpdate, toggleShowUpload, imageUrl }) => {
  return (
    <div>
      <h1>Welcome back</h1>
      <h2>{displayName}</h2>
      <img src={imageUrl || unnamed} alt="User Photo" />
      <h3>Email: {email}</h3>
      <div>
        <button className="btn-blue" onClick={showUpdate}>Update Profile</button>
        <button className="btn-blue" onClick={toggleShowUpload}>Update Photo</button>
      </div>
    </div>
  );
}

export default Welcome;