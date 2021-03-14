const Welcome = ({ displayName, email, update }) => {
  return (
    <div>
      <h1>Welcome back </h1>
      <h2>{displayName}</h2>
      <h3>Email: {email}</h3>
      <div>
        <button className="btn-blue" onClick={update}>Update Profile</button>
      </div>
    </div>
  );
}

export default Welcome;