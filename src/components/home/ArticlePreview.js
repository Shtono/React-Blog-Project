const ArticlePreview = ({ articleInfo, body, togglePreview }) => {
    const article = { ...articleInfo, body }

    const printHtml = (p, i) => {
        switch (Object.keys(p)[0]) {
            case 'h2':
                return <h2 key={i}>{p.h2}</h2>
            case 'h3':
                return <h3 key={i}>{p.h3}</h3>
            case 'p':
                return <p key={i}>{p.p}</p>
            case 'img':
                return <img key={i} className="content-img" src={p.img} alt="Image" />
        }
    }
    return article ? (
        <div className="article-preview">
            <div className="title">
                <img className="article-img" src={article.imageURL} alt="Image" />
                <div className="title-info" >
                    <h5>{article.category}</h5>
                    <h1>{article.title}</h1>
                    <p>{article.subtitle}</p>
                    <small>By <span>{article.author}</span> on Date </small>
                    <a href="#"> {article.commentsCount} comments</a>
                </div>
            </div>
            <button onClick={togglePreview}>Close</button>
            <div className="content">
                {article.body.map((p, i) => (
                    printHtml(p, i)
                ))}
            </div>
        </div >
    ) :
        (
            <div>Loading</div>
        )
}

export default ArticlePreview;