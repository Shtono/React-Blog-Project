import { Link } from 'react-router-dom';
import format from 'date-fns/format'

const SecondaryNews = ({ articles }) => {
    return (
        <div className="news-column">
            {articles && articles.map(article => (
                <div className="news-item" key={article.id} to={`/news/${article.id}`} >
                    <Link to={`/news/${article.id}`}><img src={article.imageURLMin} alt="Image" /></Link>
                    <div className="news-item-card">
                        <p>{article.category}</p>
                        <Link to={`/news/${article.id}`}>{article.title}</Link>
                        <p>{article.subtitle}</p>
                        <small>By {article.author}, {format(article.createdAt.toDate(), 'MMMMdo')}</small>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SecondaryNews;