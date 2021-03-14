import Welcome from "./Welcome"
import UpdateProfile from "./UpdateProfile"

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import { UsersContext } from '../../../context/users/UsersContext';


const MyProfile = () => {

  const [showInfo, setShowInfo] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { currentUserInfo, updateUserInfo } = useContext(UsersContext);
  const { age, company, job, name, website, city } = currentUserInfo ? currentUserInfo : '';
  const { email, displayName } = currentUser;

  const update = () => {
    setShowInfo(!showInfo)
  }


  // const { displayName, email, update } = props;
  // const { age, company, job, name, website, city, updateUserInfo, showInfo } = props;
  return (
    <div>
      <Welcome displayName={displayName} email={email} update={update} />
      <UpdateProfile age={age} company={company} job={job} name={name} website={website} city={city} updateUserInfo={updateUserInfo} showInfo={showInfo} update={update} />
    </div>
  );
}

export default MyProfile;