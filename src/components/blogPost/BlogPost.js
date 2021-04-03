import '../../styles/blog.css'
import { Link } from 'react-router-dom';

const BlogPost = ({ post, deletePost, setCurrent }) => {
  const { id, author, title, body, likes } = post;

  const handleDelete = () => deletePost(id);
  const handleCurrent = () => setCurrent(post);

  return (
    <div className="post">
      <h2>{title}</h2>

      <small>Posted by: {author}</small>

      <p>{body.slice(0, 250)}...</p>

      <p className="likes">
        <i className="far fa-heart"> {likes.length}</i>
      </p>

      <Link to={`/posts/${id}`}>
        <i className="fas fa-arrow-right"></i> Read More..
      </Link>

      {(deletePost && setCurrent) && <div>
        <button className="btn-post btn-delete" onClick={handleDelete}>Delete</button>
        <button className="btn-post btn-update" onClick={handleCurrent}>Update</button>
      </div>}

    </div>
  );
}

export default BlogPost;