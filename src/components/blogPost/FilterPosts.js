import React, { useContext } from 'react';
import { PostsContext } from '../../context/posts/PostsContext';

const FilterPosts = () => {
  const { filterPosts, clearFilter } = useContext(PostsContext);

  const onChange = (e) => {
    if (e.target.value === '') {
      clearFilter();
    } else {
      filterPosts(e.target.value.trim())
    }
  }

  return (
    <form className="search-posts">
      <label>Search Posts by Title</label>
      <input type="text" onChange={onChange} />
    </form>
  );
}

export default FilterPosts;