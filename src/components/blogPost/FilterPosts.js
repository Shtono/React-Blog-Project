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
    <form>
      <label>Search user Posts</label>
      <input type="text" onChange={onChange} />
    </form>
  );
}

export default FilterPosts;