import { Link } from 'react-router-dom';
const NewsGrid = ({ articles }) => {
    return (
        <div style={gridStyle} className="grid-container">
            {articles && articles.map(article => (
                <Link key={article.id} to={`/news/${article.id}`} >
                    <div style={containerStyle}>
                        <img style={imgStyle} src={article.imageURLMin} alt="Image" />
                        <div style={topLayerStyle}>
                            <p>{article.category}</p>
                            <p>{article.title}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default NewsGrid;

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px'
}

const containerStyle = {
    position: 'relative',
    width: '300px',
    height: '200px',
    overflow: 'hidden'
}
const imgStyle = {
    width: '100%',
    border: 'none',
    borderRadius: '0',

}
const topLayerStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    left: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.25)',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: '20px'
}