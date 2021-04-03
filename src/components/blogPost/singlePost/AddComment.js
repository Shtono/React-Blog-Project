import '../../../styles/comments.css'
import { useState } from 'react';
import { timestamp } from '../../../firebase';

const AddComment = ({ postId, addComment, postedBy, setDropdown }) => {
  const [comment, setComment] = useState({ postId, postedBy, body: '' });
  const onChange = (e) => {
    setComment({ ...comment, body: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (comment.body !== '') {
      addComment({ ...comment, createdAt: timestamp() })
      setComment({ ...comment, body: '' })
    } else {
      setDropdown('error', 'Cannot send an empty comment')
    }
  }


  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="comment..." value={comment.body} onChange={onChange} />
      <input type="submit" value="Add Comment" />
    </form>
  );
}

export default AddComment;