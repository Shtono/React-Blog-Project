import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

const SinglePost = (props) => {
  const [post, setPost] = useState(null);
  const id = props.match.params.blog_id;

  useEffect(() => {
    db.collection('posts').doc(id).get()
      .then(doc => setPost(doc.data()))
      .catch(err => console.log(err.message))
  }, [id])

  return (
    post ?
      <div className="single-post">
        <h2>{post.title}</h2>
        <small>Posted by: {post.author}</small>
        <p>{post.body}</p>
      </div>
      :
      <div>Loading...</div>
  )
}

export default SinglePost
