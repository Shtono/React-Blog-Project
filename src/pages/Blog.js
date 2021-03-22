import '../styles/blog.css'
import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../context/posts/PostsContext';
import BlogPost from '../components/blogPost/BlogPost';
import FilterPosts from '../components/blogPost/FilterPosts';
import UpdatePost from '../components/blogPost/UpdatePost';
import { db } from '../firebase';

const Blog = () => {
  const { getPosts, posts, updatePost, deletePost, current, setCurrent, clearCurrent, filtered, latestPost, loadNextPage } = useContext(PostsContext);

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
      <button onClick={onScroll}>Next Page</button>
      <FilterPosts />
      {current && <UpdatePost {...updatePostProps} />}
      {(posts && !filtered) &&
        posts.map((post) => (
          <BlogPost key={post.id} postId={post.id} userId={post.author} title={post.title} body={post.body} comments={post.comments} post={post} deletePost={deletePost} setCurrent={setCurrent} />
        ))}

      {filtered &&
        filtered.map((post) => (
          <BlogPost key={post.id} postId={post.id} userId={post.author} title={post.title} body={post.body} post={post} deletePost={deletePost} setCurrent={setCurrent} />
        ))}
    </div>
  );
}

export default Blog;
