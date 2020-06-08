import axios from 'axios';

export function postComments(attr) {//c, articleId, userId) {
  const comments = attr.c.comments;
  for (const comment of comments) {
    comment.article_id = attr.articleId;
    comment.user_id = attr.userId;
    axios.post(`/api/articles/${articleId}/comments.json`, comment);
  }
} // end submitComment

export function getAllArticles() {
  axios.get('/api/articles.json');
}

export function getArticle(attr) {
  axios.get(`/api/articles/${attr.id}.json`);
}

export function postArticle(attr) {
  axios.post('/api/articles.json', attr);
}

export function updateArticle(attr) {
  axios.put(`/api/articles/${attr.id}.json`, attr);
}

export function removeArticle(attr) {
  axios.delete(`/api/articles/${attr.id}.json`);
}
