import {
    GET_ARTICLES,
    GET_SINGLE_ARTICLE,
    SINGLE_ARTICLE_CLEANUP
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            }
        case GET_SINGLE_ARTICLE:
            return {
                ...state,
                singleArticle: action.payload
            }
        case SINGLE_ARTICLE_CLEANUP:
            return {
                ...state,
                singleArticle: null
            }
        default:
            return {
                ...state
            }
    }
}