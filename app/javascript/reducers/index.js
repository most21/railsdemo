//import { combineReducers } from "redux";
import {VIEW_ARTICLE, ADD_ARTICLE, EDIT_ARTICLE, DELETE_ARTICLE, VIEW_ALL_ARTICLES, ADD_COMMENTS, VIEW_COMMENTS} from "../actions/index";

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
  visibleArticle: '',
}

function articles(state = [], action) {
  switch (action.type) {
    case ADD_ARTICLE:
      return [
        ...state,
        {
          title: action.title,
          text: action.text,
          user_id: action.user_id,
        }
      ]
    case EDIT_ARTICLE:
      return [
        ...state,
        {
          title: action.title,
          text: action.text,
          user_id: action.user_id,
        }
      ]
    case DELETE_ARTICLE:
      return [
        ...state,
        state.filter(item => action.article_id !== item.article_id) // TODO: May not work b/c article_id not accessible
      ]
    case VIEW_ALL_ARTICLES:
      return [
        ...state,
      ]
    default:
      return state
  }
}

function comments(state = [], action) {
  switch (action.type) {
    case ADD_COMMENTS:
      return [
        ...state,
        {
          article_id: action.article_id,
          commenter: action.commenter,
          body: action.body,
          is_public: action.is_public,
          user_id: action.user_id,
        }
      ]
    default:
      return state
  }
}

function visibleArticle(state = '', action) {
  switch (action.type) {
    case VIEW_ARTICLE:
      return action.article_id
    case EDIT_ARTICLE:
      return action.article_id
    case DELETE_ARTICLE:
      return ''
    case VIEW_COMMENTS:
      return action.article_id
    case ADD_COMMENTS:
      return action.article_id
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
});

export default red;
