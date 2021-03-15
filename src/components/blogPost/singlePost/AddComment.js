import { useState } from 'react';
import { timestamp } from '../../../firebase';

const AddComment = ({ postId, addComment, postedBy }) => {
  const [comment, setComment] = useState({ postId, postedBy, body: '' });
  const onChange = (e) => {
    setComment({ ...comment, body: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    addComment({ ...comment, createdAt: timestamp() })
    setComment({ ...comment, body: '' })
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="comment..." value={comment.body} onChange={onChange} />
      <input type="submit" value="Add Comment" />
    </form>
  );
}

export default AddComment;