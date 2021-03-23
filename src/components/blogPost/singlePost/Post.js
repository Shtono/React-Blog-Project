const Post = ({ singlePost }) => {
  const { title, author, body } = singlePost;

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <small>Posted by: {author}</small>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default Post;