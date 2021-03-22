import React, { useEffect, useContext, useState } from 'react';
import { PostsContext } from '../../../context/posts/PostsContext';
import { AuthContext } from '../../../context/auth/AuthContext';
import AddComment from './AddComment';
import Comments from './Comments';
import Post from './Post';

const SinglePost = (props) => {
  const { singlePost, getSinglePost, postComments, getPostComments, addComment, singlePostCleanup, addToCommentsCount, addToLikesCount, singlePostLikes, isPostLiked } = useContext(PostsContext);
  const { currentUser } = useContext(AuthContext);
  const postId = props.match.params.blog_id;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    singlePostLikes && setIsLiked(isPostLiked())
  }, [singlePostLikes])

  useEffect(() => {
    const unsubscribe = getPostComments(postId);
    return unsubscribe;
  }, [])

  // Get Post
  useEffect(() => {
    getSinglePost(postId)
    return singlePostCleanup
  }, [])

  const handleLike = () => {
    addToLikesCount(postId)
    setIsLiked(true)
  }

  return (
    (singlePost && postComments) ?
      <div className="single-post">
        <Post title={singlePost.title} author={singlePost.author} body={singlePost.body} />
        <p>{postComments.length} comments</p>
        {!isLiked && <button onClick={handleLike}>Like This Post</button>}
        {isLiked && <p>Liked</p>}
        <AddComment postId={postId} addComment={addComment} postedBy={currentUser.displayName} addToCommentsCount={addToCommentsCount} />
        {postComments && <Comments comments={postComments} />}
      </div>
      :
      <div>Loading...</div>
  )
}

export default SinglePost
