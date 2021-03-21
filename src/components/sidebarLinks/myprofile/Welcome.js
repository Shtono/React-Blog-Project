const Welcome = ({ displayName, email, update, toggleShowUpload, imageUrl }) => {
  return (
    <div>
      <h1>Welcome back </h1>
      <h2>{displayName}</h2>
      <img src={imageUrl} alt="Profile Photo" />
      <h3>Email: {email}</h3>
      <div>
        <button className="btn-blue" onClick={update}>Update Profile</button>
        <button className="btn-blue" onClick={toggleShowUpload}>Update Photo</button>
      </div>
    </div>
  );
}

export default Welcome;