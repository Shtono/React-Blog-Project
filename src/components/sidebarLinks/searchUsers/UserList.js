import UserItem from './UserItem';

export default function UserList({ users }) {
  return (
    users ?
      <div className="user-list">
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}

      </div>
      :
      <div>Loading...</div>
  )
}


