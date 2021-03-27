import '../styles/home.css'
import { useContext } from 'react';
import SinglePageArticle from '../components/home/SinglePageArticle'
import { NewsContext } from '../context/news/NewsContext';
import NewsGrid from '../components/home/NewsGrid';

const Home = () => {
  const { articles } = useContext(NewsContext);
  return (
    <div className="blog-container">
      <NewsGrid articles={articles} />
    </div>
  );
}

export default Home;

