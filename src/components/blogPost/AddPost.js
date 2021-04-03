// import '../../styles/addPost.css'
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { timestamp } from '../../firebase';
import { PostsContext } from '../../context/posts/PostsContext';
import { AuthContext } from '../../context/auth/AuthContext';

const AddPost = () => {
  const { currentUser } = useContext(AuthContext);
  const { addPost, setDropdown } = useContext(PostsContext);
  const history = useHistory();

  const [post, setPost] = useState({
    title: '',
    body: '',
    solved: false,
    likes: [],
    likesCount: 0,
    comments: 0,
    views: 0,
    author: currentUser.displayName,
    uid: currentUser.uid
  })

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (post.title !== '' && post.body !== '') {
      const createdAt = timestamp();
      addPost({ ...post, createdAt })
      setPost({
        ...post,
        title: '',
        body: ''
      })
      history.push('/myPosts')
    } else {
      setDropdown('error', 'Please fill all fields')
    }
  }

  return (
    <div className='add-post'>
      <h1>Create Post</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Post title</label>
        <input type="text" name='title' value={post.title} onChange={onChange} />
        <label htmlFor="body">Post body</label>
        <textarea name='body' value={post.body} onChange={onChange} />
        <button>Add Post</button>
      </form>
    </div>
  );
}

export default AddPost;