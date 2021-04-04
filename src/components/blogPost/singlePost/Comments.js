import '../../../styles/comments.css'
import CommentItem from './CommentItem';

const Comments = ({ comments }) => {
  return (
    <div id="comments-container">
      {comments && comments.map(comment => (
        <CommentItem key={comment.id} postedBy={comment.postedBy} body={comment.body} createdAt={comment.createdAt} imageUrl={comment.imageUrl} />
      ))}
    </div>
  );
}

export default Comments;