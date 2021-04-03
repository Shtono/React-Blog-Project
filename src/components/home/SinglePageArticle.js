import '../../styles/articles.css'
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format'
import { NewsContext } from '../../context/news/NewsContext';
import { PostsContext } from '../../context/posts/PostsContext';
import Comments from '../blogPost/singlePost/Comments';
import AddComment from '../blogPost/singlePost/AddComment';
import { AuthContext } from '../../context/auth/AuthContext';

const SinglePageArticle = ({ match }) => {
    const articleId = match.params.articleId;
    const { getSingleArticle, singleArticle, singleArticleCleanup } = useContext(NewsContext);
    const { getPostComments, addComment, postComments, setDropdown } = useContext(PostsContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        getSingleArticle(articleId)
        return singleArticleCleanup
    }, [])

    useEffect(() => {
        const unsubscribe = getPostComments(articleId);
        return unsubscribe;
    }, [])

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

    const addCommentProps = {
        postId: articleId,
        addComment,
        postedBy: currentUser && currentUser.displayName,
        setDropdown
    }
    return singleArticle ? (
        <div className="single-page-article">
            <div className="title">
                <h5>{singleArticle.category}</h5>
                <h1>{singleArticle.title}</h1>
                <p>{singleArticle.subtitle}</p>
                <small>By <span>{singleArticle.author}</span> on {format(singleArticle.createdAt.toDate(), 'PPP')}
                    <a href="#comments"> {postComments && postComments.length} comments</a>
                </small>
            </div>
            <div className="main-image">
                <img className="article-img" src={singleArticle.imageURL} alt="Image" />
            </div>
            <div className="body">
                {singleArticle.body.map((p, i) => (
                    printHtml(p, i)
                ))}
            </div>
            <div className="comments" id="comments">
                {currentUser ? <AddComment {...addCommentProps} /> : <Link to="/login">Login to comment</Link>}
                {postComments && <Comments comments={postComments} />}
            </div>
        </div>
    ) :
        (
            <div>Loading</div>
        )

}

export default SinglePageArticle;
