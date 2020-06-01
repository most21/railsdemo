import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ article }) => (
  <div className="articleContainer">
    <h2>
      {article.created_at}
      {' - '}
      {article.title}
    </h2>
    <ul>
      <li>
        <strong>Title:</strong>
        {' '}
        {article.title}
      </li>
      <li>
        <strong>Date:</strong>
        {' '}
        {article.created_at}
      </li>
      <li>
        <strong>Text:</strong>
        {' '}
        {article.text}
      </li>
      <li>
        <strong>Author:</strong>
        {' '}
        {article.user_id}
      </li>
    </ul>
  </div>
);

Article.propTypes = {
  article: PropTypes.shape(),
};

Article.defaultProps = {
  article: undefined,
};

export default Article;
