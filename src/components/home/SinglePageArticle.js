import { useState, useEffect, useContext } from 'react';
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
        }
    }

    const addCommentProps = {
        postId: articleId,
        addComment,
        postedBy: currentUser.displayName,
        setDropdown
    }
    return singleArticle ? (
        <div>
            <h5>{singleArticle.category}</h5>
            <h1>{singleArticle.title}</h1>
            <p>{singleArticle.subtitle}</p>
            <small>By <span>{singleArticle.author}</span> on {format(singleArticle.createdAt.toDate(), 'PPP')} </small> |
            <a href="#comments"> {postComments && postComments.length} comments</a>
            <img className="article-img" src={singleArticle.imageURL} alt="Image" />
            {singleArticle.body.map((p, i) => (
                printHtml(p, i)
            ))}
            {currentUser && <AddComment {...addCommentProps} />}
            {postComments && <Comments comments={postComments} />}
        </div>
    ) :
        (
            <div>Loading</div>
        )

}

export default SinglePageArticle;
