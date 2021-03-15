const Post = ({ title, author, body, commentsCount }) => {
  return (
    <div>
      <h2>{title}</h2>
      <small>Posted by: {author}</small>
      <p>{body}</p>
    </div>
  );
}

export default Post;