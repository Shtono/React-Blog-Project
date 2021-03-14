export default function UserItem({ name }) {
  return (
    <div style={style}>
      <h3>{name}</h3>
      <button style={btnStyle}>view</button>
    </div>
  )
}

const style = {
  width: '100%',
  marginTop: '10px',
  padding: '5px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(0,0,0,0.5)'
}

const btnStyle = {
  fontSize: '15px '
}