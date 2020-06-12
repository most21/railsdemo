import axios from 'axios';

export function postComment(attr) {//c, articleId, userId) {
  //const comments = attr.c.comments;
  console.log(attr);
  // for (const comment of comments) {
  //   comment.article_id = attr.articleId;
  //   comment.user_id = attr.userId;
  //   axios.post(`/api/articles/${articleId}/comments.json`, comment);
  // }
  return axios.post(`/api/articles/${attr.article_id}/comments.json`, attr);
} // end submitComment

export function getAllArticles() {
  return axios.get('/api/articles.json');
}

export function getArticle(attr) {
  return axios.get(`/api/articles/${attr.id}.json`);
}

export function postArticle(attr) {
  return axios.post('/api/articles.json', attr);
}

export function updateArticle(attr) {
  return axios.put(`/api/articles/${attr.id}.json`, attr);
}

export function removeArticle(attr) {
  return axios.delete(`/api/articles/${attr.id}.json`);
}
