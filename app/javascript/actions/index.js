import {getAllArticles, getArticle, postArticle, updateArticle, removeArticle, postComments} from "../api/index";

// Article action types
export const VIEW_ALL_ARTICLES = 'VIEW_ALL_ARTICLES';
export const VIEW_ARTICLE_REQUEST = 'VIEW_ARTICLE_REQUEST';
export const ADD_ARTICLE_REQUEST = 'ADD_ARTICLE_REQUEST';
export const EDIT_ARTICLE_REQUEST = 'EDIT_ARTICLE_REQUEST';
export const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';

export const VIEW_ARTICLE = 'VIEW_ARTICLE';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const CLEAR_VISIBLE_ARTICLE = 'CLEAR_VISIBLE_ARTICLE';

export const VIEW_ARTICLE_SUCCESS = 'VIEW_ARTICLE_SUCCESS';
export const VIEW_ARTICLE_FAILURE = 'VIEW_ARTICLE_FAILURE';
export const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS';
export const ADD_ARTICLE_FAILURE = 'ADD_ARTICLE_FAILURE';
export const EDIT_ARTICLE_SUCCESS = 'EDIT_ARTICLE_SUCCESS';
export const EDIT_ARTICLE_FAILURE = 'EDIT_ARTICLE_FAILURE';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';

// Comment action types
export const VIEW_COMMENTS_REQUEST = 'VIEW_COMMENTS_REQUEST';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';

export const VIEW_COMMENTS = 'VIEW_COMMENTS';
export const ADD_COMMENTS = 'ADD_COMMENT';

export const VIEW_COMMENTS_SUCCESS = 'VIEW_COMMENTS_SUCCESS';
export const VIEW_COMMENTS_FAILURE = 'VIEW_COMMENTS_FAILURE';
export const ADD_COMMENTS_SUCCESS = 'ADD_COMMENTS_SUCCESS';
export const ADD_COMMENTS_FAILURE = 'ADD_COMMENTS_FAILURE';


// Article action creators
export function viewArticleRequest() {
  return {type: VIEW_ARTICLE_REQUEST}
}
export function addArticleRequest() {
  return {type: ADD_ARTICLE_REQUEST}
}
export function editArticleRequest() {
  return {type: EDIT_ARTICLE_REQUEST}
}
export function deleteArticleRequest() {
  return {type: DELETE_ARTICLE_REQUEST}
}


export const viewAllArticles = () => (dispatch) => {
  return getAllArticles().then(response => dispatch({
    articles: response.data,
    type: VIEW_ALL_ARTICLES,
  }));
}
export const viewArticle = (attr) => (dispatch) => {
  return getArticle(attr).then(response => dispatch({
    article: response.data,
    type: VIEW_ARTICLE,
  }));
}
export const addArticle = (attr) => (dispatch) => {
  return postArticle(attr).then(response => dispatch({
    article: response.data,
    type: ADD_ARTICLE,
  }));
}
export const editArticle = (attr) => (dispatch) => {
  return updateArticle(attr).then(response => dispatch({
    article: response.data,
    type: EDIT_ARTICLE,
  }));
}
export const deleteArticle = (attr) => (dispatch) => {
  return removeArticle(attr).then(response => dispatch({
    article: response.data,
    type: DELETE_ARTICLE,
  }))
}
export const clearVisibleArticle = () => (dispatch) => {
  return dispatch({
    type: CLEAR_VISIBLE_ARTICLE,
  });
}

export function viewArticleSuccess() {
  return {type: VIEW_ARTICLE_SUCCESS}
}
export function viewArticleFailure(error) {
  return {type: VIEW_ARTICLE_FAILURE, error: error}
}
export function addArticleSuccess() {
  return {type: ADD_ARTICLE_SUCCESS}
}
export function addArticleFailure(error) {
  return {type: ADD_ARTICLE_FAILURE, error: error}
}
export function editArticleSuccess() {
  return {type: EDIT_ARTICLE_SUCCESS}
}
export function editArticleFailure(error) {
  return {type: EDIT_ARTICLE_FAILURE, error: error}
}
export function deleteArticleSuccess() {
  return {type: DELETE_ARTICLE_SUCCESS}
}
export function deleteArticleFailure(error) {
  return {type: DELETE_ARTICLE_FAILURE, error: error}
}

// Comment action creators
export function viewCommentsRequest() {
  return {type: VIEW_COMMENTS_REQUEST}
}
export function addCommentRequest() {
  return {type: ADD_COMMENT_REQUEST}
}


export function viewComments(article_id) {
  return {
    type: VIEW_COMMENTS,
    article_id: article_id,
  }
}
export const addComments = (attr) => (dispatch) => {
  return postComments(attr).then(response => dispatch({
    comments: response.data,
    type: ADD_COMMENTS,
  }));
}

export function viewCommentsSuccess() {
  return {type: VIEW_COMMENTS_SUCCESS}
}
export function viewCommentsFailure(error) {
  return {type: VIEW_COMMENTS_FAILURE, error: error}
}
export function addCommentSuccess() {
  return {type: ADD_COMMENT_SUCCESS}
}
export function addCommentFailure(error) {
  return {type: ADD_COMMENT_FAILURE, error: error}
}
