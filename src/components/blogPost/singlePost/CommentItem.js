import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CommentItem = ({ postedBy, body, createdAt }) => {
  const timeAgo = createdAt ? formatDistanceToNow(createdAt.toDate()) : '';

  return (
    <div style={{ marginTop: '10px' }} >
      <small>{postedBy}</small>
      <p>{body}</p>
      <small>{timeAgo} ago</small>
    </div>
  );
}

export default CommentItem;