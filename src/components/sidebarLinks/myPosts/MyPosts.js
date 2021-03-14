import { useContext } from 'react';
import BlogPost from "../../blogPost/BlogPost";
import { PostsContext } from '../../../context/posts/PostsContext';
import UpdatePost from '../../blogPost/UpdatePost';


const MyPosts = () => {
  const { userPosts, deletePost, setCurrent, current, clearCurrent, updatePost } = useContext(PostsContext);
  return (
    <div className="blog-container">

      {current && <UpdatePost current={current} clearCurrent={clearCurrent} updatePost={updatePost} />
      }

      { userPosts && userPosts.map(post => (
        <BlogPost key={post.id} postId={post.id} userId={post.author} title={post.title} body={post.body} post={post} deletePost={deletePost} setCurrent={setCurrent} />
      ))
      }

    </div>
  );
}

export default MyPosts;