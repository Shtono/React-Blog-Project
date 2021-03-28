import { Link } from 'react-router-dom';
const SecondaryNews = ({ articles }) => {
    return (
        <div className="grid-container">
            {articles && articles.map(article => (
                <Link key={article.id} to={`/news/${article.id}`} >
                    <div>
                        <img src={article.imageURLMin} alt="Image" />
                        <div>
                            <p>{article.category}</p>
                            <p>{article.title}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default SecondaryNews;