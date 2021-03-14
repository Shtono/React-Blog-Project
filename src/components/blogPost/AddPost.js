import '../../styles/addPost.css'
import { useState, useContext } from 'react';
import { timestamp } from '../../firebase';
import { PostsContext } from '../../context/posts/PostsContext';
import { AuthContext } from '../../context/auth/AuthContext';

const AddPost = () => {
  const { currentUser } = useContext(AuthContext);
  const { addPost } = useContext(PostsContext);

  const [post, setPost] = useState({
    title: '',
    body: '',
    solved: false,
    likes: 0,
    comments: 0,
    author: currentUser.displayName,
    uid: currentUser.uid
  })

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (post.title !== '' && post.body !== '') {
      const date = timestamp();
      addPost({ ...post, date })
      setPost({
        ...post,
        title: '',
        body: ''
      })
    }
  }

  return (
    <div className='add-post-container'>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="title">Post title</label>
            <input type="text" name='title' value={post.title} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="body">Post body</label>
            <textarea rows="5" cols="25" name='body' value={post.body} onChange={onChange} />
          </div>
          <input type="submit" value="Add Post" />
        </form>
      </div>
    </div>
  );
}

export default AddPost;