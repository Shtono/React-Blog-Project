import { Link } from 'react-router-dom';


const BlogPost = ({ post, deletePost, setCurrent }) => {
  const { id, author, title, body, likes } = post;

  const handleDelete = () => deletePost(id);
  const handleCurrent = () => setCurrent(post);

  return (
    <div className="home">
      <div className="post">
        <h2>{title}</h2>
        <br /><br />
        <small>Posted by: {author}</small>
        <br />
        <p>{body.slice(0, 250)}...</p>
        <Link to={`/posts/${id}`}>Read More..</Link>
        <p>{likes.length || 'no'} likes</p>
        {deletePost && <button className="btn-post btn-delete" onClick={handleDelete}>Delete</button>}
        {setCurrent && <button className="btn-post btn-update" onClick={handleCurrent}>Update</button>}
        <p></p>
      </div>
    </div>
  );
}

export default BlogPost;