import '../../../styles/findUser.css'
import { useContext, useEffect } from 'react';
import { UsersContext } from '../../../context/users/UsersContext';
import FilterUsers from './FilterUsers';
import UserList from "./UserList";


const SeachUsers = () => {
  const { getUsers, users, filteredUsers, filterUsers, } = useContext(UsersContext);

  useEffect(() => {
    const unsubscribe = getUsers();
    return unsubscribe;
  }, [])

  return (
    <div className="find-user">
      <FilterUsers filter={filterUsers} />
      {filteredUsers ?
        <UserList users={filteredUsers} />
        :
        <UserList users={users} />}
    </div>
  );
}

export default SeachUsers;