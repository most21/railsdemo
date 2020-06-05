export const submitComment = (c, articleId, userId)  => {
  const comments = c.comments;
  for (const comment of comments) {
    comment.article_id = articleId;
    comment.user_id = userId;
    axios
      .post(`/api/articles/${articleId}/comments.json`, comment)
      .then((response) => {
        success('Comment(s) Added!');
      })
      .catch(handleAjaxError);
  }
} // end submitComment

export const addArticle = (newArticle) => {
  axios
    .post('/api/articles.json', newArticle)
    .then((response) => {
      success('Article Added!');
    })
    .catch(handleAjaxError);
} // end addArticle

export const deleteArticle(articleId) {
  axios
    .delete(`/api/articles/${articleId}.json`)
    .then((response) => {
      if (response.status === 204) {
        success('Article deleted');
      }
    })
    .catch(handleAjaxError);
} // end deleteArticle

export const updateArticle = (updatedArticle, articles) => {
  axios
    .put(`/api/articles/${updatedArticle.id}.json`, updatedArticle)
    .then(() => {
      success('Article updated');
    })
    .catch(handleAjaxError);
} // end updateArticle
