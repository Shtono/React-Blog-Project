import React, { useEffect, useContext } from 'react';
import { PostsContext } from '../../../context/posts/PostsContext';
import { AuthContext } from '../../../context/auth/AuthContext';
import AddComment from './AddComment';
import Comments from './Comments';
import Post from './Post';

const SinglePost = (props) => {
  const { singlePost, getSinglePost, postComments, getPostComments, addComment, singlePostCleanup } = useContext(PostsContext);
  const { currentUser } = useContext(AuthContext);
  const postId = props.match.params.blog_id;

  // Get Post
  useEffect(() => {
    getSinglePost(postId)
    getPostComments(postId)
    return singlePostCleanup
  }, [postId])

  return (
    (singlePost && postComments) ?
      <div className="single-post">
        <Post title={singlePost.title} author={singlePost.author} body={singlePost.body} />
        <AddComment postId={postId} addComment={addComment} postedBy={currentUser.displayName} />
        {postComments && <Comments comments={postComments} />}
      </div>
      :
      <div>Loading...</div>
  )
}

export default SinglePost
