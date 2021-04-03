import '../../../styles/myProfile.css'
import Welcome from "./Welcome"
import UpdateProfile from "./UpdateProfile"
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import { UsersContext } from '../../../context/users/UsersContext';
import UploadPhoto from "./UploadPhoto";


const MyProfile = () => {

  const [showInfo, setShowInfo] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { currentUserInfo, updateUserInfo, getUserInfo } = useContext(UsersContext);
  const { age, company, job, name, website, city, imageUrl, posts, comments, regDate } = currentUserInfo ? currentUserInfo : '';
  const { email, displayName } = currentUser;

  const showUpdate = () => {
    setShowInfo(!showInfo)
  }
  const toggleShowUpload = () => {
    setShowUpload(!showUpload)
  }

  const welcomeProps = {
    displayName,
    email,
    regDate,
    showUpdate,
    toggleShowUpload,
    imageUrl,
    posts,
    comments
  }
  const updateProfileProps = {
    age,
    company,
    job,
    name,
    website,
    city,
    updateUserInfo,
    showInfo,
    showUpdate,
    getUserInfo,
    id: currentUser.uid
  }

  return (
    <div className="my-profile">
      <Welcome {...welcomeProps} updateProfile={updateProfileProps} />
      {/* <UpdateProfile {...updateProfileProps} /> */}
      {showUpload && <UploadPhoto />}
    </div>
  );
}

export default MyProfile;

// return (
//   <div className="my-profile">
//     <Welcome {...welcomeProps} />
//     <UpdateProfile {...updateProfileProps} />
//     {showUpload && <UploadPhoto />}
//   </div>
// );