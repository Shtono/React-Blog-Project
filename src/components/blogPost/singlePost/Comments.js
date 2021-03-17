import CommentItem from './CommentItem';

const Comments = ({ comments }) => {
  return (
    <div style={{ marginTop: '25px' }}>
      {comments && comments.map(comment => (
        <CommentItem key={comment.id} postedBy={comment.postedBy} body={comment.body} createdAt={comment.createdAt} />
      ))}
    </div>
  );
}

export default Comments;