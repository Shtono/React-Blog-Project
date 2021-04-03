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
    <div className='update-post'>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Update title</label>
        <input type="text" name='title' value={title} onChange={onChange} />
        <label htmlFor="body">Update body</label>
        <textarea rows="15" cols="25" name='body' value={body} onChange={onChange} />
        <div>
          <button type="button" onClick={clearCurrent}>Cancel</button>
          <button type="submit" value="Update Post" >Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePost;