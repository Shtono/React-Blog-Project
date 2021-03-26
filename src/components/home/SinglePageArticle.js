import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import format from 'date-fns/format'

const SinglePageArticle = ({ match }) => {
    const articleId = match.params.articleId;
    const [article, setArticle] = useState(null);

    useEffect(() => {
        db.collection('articles')
            .doc(articleId)
            .get()
            .then(doc => setArticle(doc.data()))
    }, [])

    const printHtml = (p) => {
        switch (Object.keys(p)[0]) {
            case 'h2':
                return <h2 key={p.h2.slice(1, 10)}>{p.h2}</h2>
            case 'h3':
                return <h3 key={p.h3.slice(1, 10)}>{p.h3}</h3>
            case 'p':
                return <p key={p.p.slice(1, 10)}>{p.p}</p>
        }
    }
    return article ? (
        <div>
            <h5>{article.category}</h5>
            <h1>{article.title}</h1>
            <p>{article.subtitle}</p>
            <small>By <span>{article.author}</span> on {format(article.createdAt.toDate(), 'PPP')} </small> |
            <a href="#"> {article.commentsCount} comments</a>
            <img className="article-img" src={article.imageURL} alt="Image" />
            {article.body.map(p => (
                printHtml(p)
            ))}

        </div>
    ) :
        (
            <div>Loading</div>
        )
}

export default SinglePageArticle;