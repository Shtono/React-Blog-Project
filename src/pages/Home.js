import '../styles/home.css'
import { useContext } from 'react';
import SinglePageArticle from '../components/home/SinglePageArticle'
import { NewsContext } from '../context/news/NewsContext';
import NewsGrid from '../components/home/NewsGrid';
import SecondaryNews from '../components/home/SecondaryNews';

const Home = () => {
  const { latestArticles, articles } = useContext(NewsContext);
  return (
    <div className="home">
      <NewsGrid articles={latestArticles} />
      <SecondaryNews articles={articles} />
    </div>
  );
}

export default Home;

