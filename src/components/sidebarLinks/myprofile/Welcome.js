import unnamed from '../../../assets/img/unnamed.png'
import UpdateProfile from './UpdateProfile';
import format from 'date-fns/format'
const Welcome = ({ displayName, email, showUpdate, toggleShowUpload, imageUrl, updateProfile, posts, comments, regDate }) => {
  return (
    <div className="welcome">
      <div className="info">
        {/* <h1>Welcome back</h1> */}
        <h2>{displayName}</h2>
        <h3>Email: {email}</h3>
        <h3>Member since: {format(regDate.toDate(), 'PPP')}</h3>
        <h3>Posts: {posts}</h3>
        <h3>Comments: {comments}</h3>
        <UpdateProfile {...updateProfile} />
        <button className="btn-blue" onClick={showUpdate}>Update Profile</button>
        <button className="btn-blue" onClick={toggleShowUpload}>Update Photo</button>
      </div>
      <img src={imageUrl || unnamed} alt="User Photo" />
    </div>
  );
}

export default Welcome;