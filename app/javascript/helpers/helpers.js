import { error } from './notifications';

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

export const validateComment = (comment) => {
  const errors = {};

  if (comment.commenter === '') {
    errors.commenter = 'You must enter a display name';
  }

  if (comment.body === '') {
    errors.body = 'You must enter some text in the body';
  }

  return errors;
}

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.warn(err);
};
