const Post = ({ singlePost }) => {
  const { title, author, body, likes } = singlePost;

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <small>Posted by: {author}</small>
        <p>{body}</p>
        <p>{likes.length} likes</p>
      </div>
    </div>
  );
}

export default Post;