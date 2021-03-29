import { Link } from 'react-router-dom';
const NewsGrid = ({ articles }) => {
    return (
        <div className="news-grid">
            {articles && articles.map(article => (
                <Link className="grid-item" key={article.id} to={`/news/${article.id}`} >
                    <img src={article.imageURL} alt="Image" />
                    {/* <img src={article.imageURLMin} alt="Image" /> */}
                    <div>
                        <p>{article.category}</p>
                        <p>{article.title}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default NewsGrid;

