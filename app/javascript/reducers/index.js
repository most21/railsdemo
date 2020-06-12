//import { combineReducers } from "redux";
import {VIEW_ARTICLE, ADD_ARTICLE, EDIT_ARTICLE, DELETE_ARTICLE, VIEW_ALL_ARTICLES, ADD_COMMENT, VIEW_COMMENTS, CLEAR_VISIBLE_ARTICLE} from "../actions/index";

import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

/*
App state shape:
{
  articles: [],
  comments: [],

  visibleArticle: '',
}
*/

const initialState = {
  articles: [],
  comments: [],
  //users: [],
  //currentUser: '',
  visibleArticle: {},
}

function articles(state = [], action) {
  switch (action.type) {
    case ADD_ARTICLE:
      return {
        ...state,
        isFetching: false,
        item: action.article,
      }
    case EDIT_ARTICLE:
      return {
        ...state,
        isFetching: false,
        item: action.article,
      }
    case DELETE_ARTICLE:
      return {
        ...state,
        isFetching: false,
        items: state.items
      }
    case VIEW_ALL_ARTICLES:
      return {
          ...state,
          isFetching: false,
          items: action.articles
        };
    default:
      return state
  }
}

function comments(state = [], action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        isFetching: false,
        item: action.comment,
      }
      // return [
      //   ...state,
      //   {
      //     article_id: action.article_id,
      //     commenter: action.commenter,
      //     body: action.body,
      //     is_public: action.is_public,
      //     user_id: action.user_id,
      //   }
      // ]
    default:
      return state
  }
}

function visibleArticle(state = {}, action) {
  switch (action.type) {
    case CLEAR_VISIBLE_ARTICLE:
      return {
        ...state,
        isFetching: false,
        item: {},
      }
    case VIEW_ARTICLE:
      return {
        ...state,
        isFetching: false,
        item: action.article,
      }
    case EDIT_ARTICLE:
      return {
        ...state,
        isFetching: false,
        item: action.article,
      }
    case DELETE_ARTICLE:
      return {
        ...state,
        isFetching: false,
        item: {},
      }
    default:
      return state
  }
}

function blogApp(state = initialState, action) {
  return {
    articles: articles(state.articles, action),
    comments: comments(state.comments, action),
    visibleArticle: visibleArticle(state.visibleArticle, action)
  }
} // end function

const red = combineReducers({
  articles,
  comments,
  visibleArticle,
  form: formReducer
});

export default red;
