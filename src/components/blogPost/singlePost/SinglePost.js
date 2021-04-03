import '../../../styles/blog.css'
import React, { useEffect, useContext, useState } from 'react';
import { PostsContext } from '../../../context/posts/PostsContext';
import { AuthContext } from '../../../context/auth/AuthContext';
import AddComment from './AddComment';
import Comments from './Comments';
import Post from './Post';

const SinglePost = (props) => {
  const {
    singlePost,
    getSinglePost,
    postComments,
    getPostComments,
    addComment,
    singlePostCleanup,
    addToCommentsCount,
    addToLikesCount,
    addPostView,
    singlePostLikes,
    isPostLiked,
    setDropdown
  } = useContext(PostsContext);

  const { currentUser } = useContext(AuthContext);
  const postId = props.match.params.blog_id;

  const [isLiked, setIsLiked] = useState(false);

  // Checks if post is already liked by the current user
  useEffect(() => {
    singlePostLikes && setIsLiked(isPostLiked())
  }, [singlePostLikes])

  // Get comments
  useEffect(() => {
    const unsubscribe = getPostComments(postId);
    return unsubscribe;
  }, [])

  // Get Post
  useEffect(() => {
    getSinglePost(postId)
    return singlePostCleanup
  }, [])

  // Increase views
  useEffect(() => {
    singlePost && addPostView(postId)
  }, [singlePost])

  const handleLike = () => {
    addToLikesCount(postId)
    setIsLiked(true)
  }

  const addCommentProps = {
    postId,
    addComment,
    postedBy: currentUser.displayName,
    addToCommentsCount,
    setDropdown
  }

  return (
    (singlePost && postComments) ?
      <div className="single-post">
        <div className="flex-container">
          <div className="post-info">
            <i className="far fa-heart"> {singlePost.likes.length}</i>

            <i className="far fa-comments"> {postComments.length}</i>
            <i className="far fa-eye"> {singlePost.views}</i>

            {!isLiked && <button onClick={handleLike}>Like</button>}

            {isLiked && <p>Liked</p>}
          </div>
          <Post singlePost={singlePost} />
        </div>
        <div className="comments">
          <AddComment {...addCommentProps} />
          {postComments && <Comments comments={postComments} />}
        </div>
      </div>
      :
      <div>Loading...</div>
  )
}

export default SinglePost
