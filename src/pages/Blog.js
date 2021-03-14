import '../styles/blog.css'
import { useContext } from 'react';
import { PostsContext } from '../context/posts/PostsContext';
import BlogPost from '../components/blogPost/BlogPost';
import FilterPosts from '../components/blogPost/FilterPosts';
import UpdatePost from '../components/blogPost/UpdatePost';

const Blog = () => {
  const { posts, updatePost, deletePost, current, setCurrent, clearCurrent } = useContext(PostsContext);

  return (
    <div className="blog-container">
      <FilterPosts />
      {current && <UpdatePost current={current} clearCurrent={clearCurrent} updatePost={updatePost} />}
      {posts && posts.map((post) => (
        <BlogPost key={post.id} postId={post.id} userId={post.author} title={post.title} body={post.body} post={post} deletePost={deletePost} setCurrent={setCurrent} />
      ))}

    </div>
  );
}

export default Blog;