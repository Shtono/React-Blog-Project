import UserItem from './UserItem';

export default function UserList({ users }) {
  return (
    users ?
      <div style={{ width: '100%' }}>
        <h2 style={{ marginTop: '25px' }}>Users:</h2>
        {users.map(user => (
          <UserItem key={user.id} name={user.username} />
        ))}

      </div>
      :
      <div>Loading...</div>
  )
}


