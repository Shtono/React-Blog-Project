import format from 'date-fns/format'
const Post = ({ singlePost }) => {
  const { title, author, body, likes, createdAt } = singlePost;

  return (
    <div className="post-body">
      <h2>{title}</h2>
      <small>Posted by: <span>{author}</span> on {format(createdAt.toDate(), 'PPP')} </small>
      <p>{body}</p>
    </div>
  );
}

export default Post;