import axios from 'axios';

// export const submitComment = (c, articleId, userId)  => {
//   const comments = c.comments;
//   for (const comment of comments) {
//     comment.article_id = articleId;
//     comment.user_id = userId;
//     axios
//       .post(`/api/articles/${articleId}/comments.json`, comment)
//       .then((response) => {
//         success('Comment(s) Added!');
//       })
//       .catch(handleAjaxError);
//   }
// } // end submitComment

export const getArticle(attr) {
  axios.get(`/api/api/articles/${attr.id}.json`);
}

export const postArticle(attr) {
  axios.post('/api/articles.json', attr);
}

export const updateArticle = (attr) => {
  axios.put(`/api/articles/${attr.id}.json`, attr);
}

export const removeArticle(attr) {
  axios.delete(`/api/articles/${attr.id}.json`);
}
