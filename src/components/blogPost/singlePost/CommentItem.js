import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CommentItem = ({ postedBy, body, createdAt }) => {
  const timeAgo = createdAt ? formatDistanceToNow(createdAt.toDate()) : '';

  return (
    <div className="comment-item">
      <span>{postedBy}</span>
      <p>{body}</p>
      <small>{timeAgo} ago</small>
    </div>
  );
}

export default CommentItem;