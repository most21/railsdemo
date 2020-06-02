export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validateArticle = (article) => {
  const errors = {};

  if (article.title === '') {
    errors.title = 'You must enter a title';
  }

  if (article.text === '') {
    errors.text = 'You must enter some text in the body';
  }

  return errors;
}
