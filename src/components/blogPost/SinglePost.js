import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

const SinglePost = (props) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const id = props.match.params.blog_id;

  useEffect(() => {
    db.collection('posts').doc(id).get()
      .then(doc => setPost(doc.data()))
      .catch(err => console.log(err.message))
  }, [id])
  useEffect(() => {
    db.collection('comments').where("postId", "==", id).get().then(snapshot => {
      setComments(snapshot.docs.map(doc => doc.data()))
    })
      .catch(err => console.log(err))
  }, [id])

  const seconds = formatDistanceToNow(new Date());
  console.log(seconds)

  return (
    post ?
      <div className="single-post">
        <div>
          <h2>{post.title}</h2>
          <small>Posted by: {post.author}</small>
          <p>{post.body}</p>
        </div>
        {comments &&
          <div>
            {comments[0].body} <br />
            {formatDistanceToNow(comments[0].createdAt.toDate())}
          </div>
        }
      </div>
      :
      <div>Loading...</div>
  )
}

export default SinglePost
