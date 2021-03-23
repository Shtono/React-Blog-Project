import '../styles/blog.css'
import { useContext, useEffect } from 'react';
import { PostsContext } from '../context/posts/PostsContext';
import BlogPost from '../components/blogPost/BlogPost';
import FilterPosts from '../components/blogPost/FilterPosts';
import UpdatePost from '../components/blogPost/UpdatePost';

const Blog = () => {
  const { getPosts, posts, updatePost, current, clearCurrent, filtered, latestPost, loadNextPage } = useContext(PostsContext);

  useEffect(() => {
    getPosts();
  }, [])

  const updatePostProps = {
    current,
    clearCurrent,
    updatePost
  }

  const onScroll = (e) => {
    if (e.target.offsetHeight + e.target.scrollTop === e.target.scrollHeight) {
      loadNextPage(latestPost)
    }
  }

  return (
    <div className="blog-container" onScroll={onScroll}>
      <FilterPosts />

      {current && <UpdatePost {...updatePostProps} />}

      {(posts && !filtered) &&
        posts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}

      {filtered &&
        filtered.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
    </div>
  );
}

export default Blog;
