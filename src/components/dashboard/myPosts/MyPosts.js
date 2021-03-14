import { useContext } from 'react';
import BlogPost from "../../blogPost/BlogPost";
import PostsContext from '../../../context/posts/postsContext';


const MyPosts = () => {
  const { userPosts, deletePost, setCurrent } = useContext(PostsContext);
  // updatePost, current, clearCurrent
  return (
    <div className="blog-container">
      { userPosts && userPosts.map(post => (
        <BlogPost key={post.id} postId={post.id} userId={post.author} title={post.title} body={post.body} post={post} deletePost={deletePost} setCurrent={setCurrent} />
      ))}
    </div>
  );
}

export default MyPosts;