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
  const { age, company, job, name, website, city, imageUrl } = currentUserInfo ? currentUserInfo : '';
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
    showUpdate,
    toggleShowUpload,
    imageUrl
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
    <div>
      <Welcome {...welcomeProps} />
      <UpdateProfile {...updateProfileProps} />
      {showUpload && <UploadPhoto />}
    </div>
  );
}

export default MyProfile;