import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ArticleList extends React.Component {
  renderArticles() {
    const { activeId, articles } = this.props;
    articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return articles.map(article => (
      <li key={article.id}>
        <Link to={`/articles/${article.id}`} className={activeId === article.id ? 'active' : ''}>
          {article.created_at}
          {' - '}
          {article.title}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <section className="articleList">
        <h2>
          Articles
          <Link to="/articles/new">New Article</Link>
        </h2>
        <ul>{this.renderArticles()}</ul>
      </section>
    );
  }
}

ArticleList.propTypes = {
  activeId: PropTypes.number,
  articles: PropTypes.arrayOf(PropTypes.object),
};

ArticleList.defaultProps = {
  activeId: undefined,
  articles: [],
};

export default ArticleList;
