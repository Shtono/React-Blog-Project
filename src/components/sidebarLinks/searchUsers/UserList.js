import UserItem from './UserItem';

export default function UserList({ users }) {
  return (
    users ?
      <div>
        <h2>Users:</h2>
        {users.map(user => (
          <UserItem key={user.id} userId={user.id} name={user.username} isActive={user.isActive} />
        ))}

      </div>
      :
      <div>Loading...</div>
  )
}


