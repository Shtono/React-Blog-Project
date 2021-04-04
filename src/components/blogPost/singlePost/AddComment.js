import '../../../styles/comments.css'
import { useState, useContext } from 'react';
import { timestamp } from '../../../firebase';
import { UsersContext } from '../../../context/users/UsersContext'

const AddComment = ({ postId, addComment, postedBy, setDropdown }) => {
  const { currentUserInfo } = useContext(UsersContext)
  const { imageUrl } = currentUserInfo;
  const [comment, setComment] = useState({ postId, postedBy, imageUrl, body: '' });
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