import { Link } from 'react-router-dom';


const BlogPost = ({ userId, title, body, postId, post, deletePost, setCurrent }) => {

  const handleDelete = () => deletePost(postId);
  const handleCurrent = () => setCurrent(post);

  return (
    <div className="home">
      <div className="post">
        <h2>{title}</h2>
        <small>Posted by: {userId}</small>
        <p>{body}</p>
        <Link to={`/posts/${post.id}`}>Read More..</Link>
        <button className="btn-post btn-delete" onClick={handleDelete}>Delete</button>
        <button className="btn-post btn-update" onClick={handleCurrent}>Update</button>
      </div>
    </div>
  );
}

export default BlogPost;