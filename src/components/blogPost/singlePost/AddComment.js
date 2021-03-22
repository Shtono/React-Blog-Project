import { useState } from 'react';
import { timestamp } from '../../../firebase';

const AddComment = ({ postId, addComment, postedBy, addToCommentsCount }) => {
  const [comment, setComment] = useState({ postId, postedBy, body: '' });
  const onChange = (e) => {
    setComment({ ...comment, body: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    addComment({ ...comment, createdAt: timestamp() })
    setComment({ ...comment, body: '' })
    addToCommentsCount(postId)
  }


  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="comment..." value={comment.body} onChange={onChange} />
      <input type="submit" value="Add Comment" />
      <button>Like it!</button>
    </form>
  );
}

export default AddComment;