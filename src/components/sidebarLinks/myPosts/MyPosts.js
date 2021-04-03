import '../../../styles/blog.css'
import { useContext, useEffect } from 'react';
import BlogPost from "../../blogPost/BlogPost";
import { PostsContext } from '../../../context/posts/PostsContext';
import UpdatePost from '../../blogPost/UpdatePost';

const MyPosts = () => {
  const { realTimeListenerUserPosts, userPosts, deletePost, setCurrent, current, clearCurrent, updatePost } = useContext(PostsContext);

  useEffect(() => {
    const unsubscribe = realTimeListenerUserPosts();
    return unsubscribe;
  }, [])

  return (
    <div className="blog">

      {current && <UpdatePost current={current} clearCurrent={clearCurrent} updatePost={updatePost} />
      }

      <div className="posts-container">
        {userPosts && userPosts.map(post => (
          <BlogPost key={post.id} postId={post.id} userId={post.author} title={post.title} body={post.body} post={post} deletePost={deletePost} setCurrent={setCurrent} />
        ))
        }
      </div>

    </div >
  );
}

export default MyPosts;