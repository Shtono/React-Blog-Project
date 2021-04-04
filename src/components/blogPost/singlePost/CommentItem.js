import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CommentItem = ({ postedBy, body, createdAt, imageUrl }) => {
  const timeAgo = createdAt ? formatDistanceToNow(createdAt.toDate()) : '';

  return (
    <div className="comment-item">
      <div className="info">
        <span>{postedBy}</span>
        <img src={imageUrl} alt="" />
      </div>
      <div className="comment-body">
        <p>{body}</p>
        <small>{timeAgo} ago</small>
      </div>
    </div>
  );
}

export default CommentItem;