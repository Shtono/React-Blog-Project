import { useContext } from 'react';
import { UsersContext } from '../../../context/users/UsersContext';
import FilterUsers from './FilterUsers';
import UserList from "./UserList";


const SeachUsers = () => {
  const { users, filteredUsers, filterUsers, } = useContext(UsersContext);
  return (
    <div>
      <FilterUsers filter={filterUsers} />
      {filteredUsers ?
        <UserList users={filteredUsers} />
        :
        <UserList users={users} />}
    </div>
  );
}

export default SeachUsers;