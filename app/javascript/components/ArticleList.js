import React from 'react';
import PropTypes from 'prop-types';

class ArticleList extends React.Component {
  renderArticles() {
    const { articles } = this.props;
    articles.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );

    return articles.map(article => (
      <li key={article.id}>
        {article.created_at}
        {' - '}
        {article.title}
      </li>
    ));
  }

  render() {
    return (
      <section>
        <h2>Articles</h2>
        <ul>{this.renderArticles()}</ul>
      </section>
    );
  }
}

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
};

ArticleList.defaultProps = {
  articles: [],
};

export default ArticleList;
