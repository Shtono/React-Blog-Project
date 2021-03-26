import { useState, useEffect, createContext, useReducer } from 'react';
import newsReducer from './newsReducer';
import { db } from '../../firebase';
import {
    GET_ARTICLES
} from '../types'
export const NewsContext = createContext();

const NewsContextProvider = (props) => {

    const initialState = {
        articles: [],
        singleArticle: {},
        singleArticleComments: []
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

    return <NewsContext.Provider value={{
        articles: state.articles,
        singleArticle: state.singleArticle,
        singleArticleComments: state.singleArticleComments
    }}>
        {props.children}
    </NewsContext.Provider>
}

export default NewsContextProvider;