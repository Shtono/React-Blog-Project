import { useState, useEffect, createContext, useReducer } from 'react';
import newsReducer from './newsReducer';
import { db } from '../../firebase';
import {
    GET_ARTICLES,
    GET_SINGLE_ARTICLE,
    SINGLE_ARTICLE_CLEANUP
} from '../types'
export const NewsContext = createContext();

const NewsContextProvider = (props) => {

    const initialState = {
        articles: null,
        singleArticle: null,
        singleArticleComments: null
    }

    const [state, dispatch] = useReducer(newsReducer, initialState);
    const newsRef = db.collection('articles');

    useEffect(() => {
        newsRef
            .orderBy("createdAt", "desc")
            .get()
            .then(snapshot => {
                const arr = snapshot.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                })
                dispatch({ type: GET_ARTICLES, payload: arr })
            })
    }, [])

    // GET Single Article
    const getSingleArticle = (id) => {
        newsRef
            .doc(id)
            .get()
            .then(doc => {
                dispatch({ type: GET_SINGLE_ARTICLE, payload: doc.data() })
            })
    }

    // Single Article Cleanup
    const singleArticleCleanup = () => {
        dispatch({ type: SINGLE_ARTICLE_CLEANUP })
    }

    return <NewsContext.Provider value={{
        articles: state.articles,
        singleArticle: state.singleArticle,
        singleArticleComments: state.singleArticleComments,
        getSingleArticle,
        singleArticleCleanup,
    }}>
        {props.children}
    </NewsContext.Provider>
}

export default NewsContextProvider;