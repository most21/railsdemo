import axios from 'axios';

export function postComment(attr) {//c, articleId, userId) {
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
