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
  const { currentUserInfo, updateUserInfo, userImgUrl } = useContext(UsersContext);
  const { age, company, job, name, website, city, imageUrl } = currentUserInfo ? currentUserInfo : '';
  const { email, displayName } = currentUser;

  const update = () => {
    setShowInfo(!showInfo)
  }
  const toggleShowUpload = () => {
    setShowUpload(!showUpload)
  }


  // const { displayName, email, update } = props;
  // const { age, company, job, name, website, city, updateUserInfo, showInfo } = props;
  return (
    <div>
      <Welcome displayName={displayName} email={email} update={update} toggleShowUpload={toggleShowUpload} imageUrl={imageUrl} />
      <UpdateProfile age={age} company={company} job={job} name={name} website={website} city={city} updateUserInfo={updateUserInfo} showInfo={showInfo} update={update} />
      <br /><br /><br /><br /><br /><br />
      {showUpload && <UploadPhoto />}
    </div>
  );
}

export default MyProfile;