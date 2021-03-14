import { useState } from 'react';

const UpdatePost = ({ current, clearCurrent, updatePost }) => {
  const [updatedPost, setUpdatedPost] = useState({ ...current })
  const { title, body } = updatedPost;

  const onChange = (e) => {
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    updatePost(updatedPost.id, updatedPost)
    setUpdatedPost({
      title: '',
      body: '',
    })
    clearCurrent();
  }

  return (
    <div className='add-post-container'>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Update title</label>
        <input type="text" name='title' value={title} onChange={onChange} />
        <label htmlFor="body">Update body</label>
        <textarea rows="5" cols="25" name='body' value={body} onChange={onChange} />
        <input type="submit" value="Update Post" />
        <button onClick={clearCurrent}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdatePost;