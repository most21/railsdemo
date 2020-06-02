import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.searchInput = React.createRef();
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    //this.matchSearchTerm = this.matchSearchTerm.bind(this);
  } // end constructor

  updateSearchTerm() {
    this.setState({ searchTerm: this.searchInput.current.value });
  } // end updateSearchTerm

  matchSearchTerm(obj) {
    const {
      id, created_at, updated_at, comments, user_id, ...rest
    } = obj;
    const { searchTerm } = this.state;
    console.log(searchTerm)
    return Object.values(rest).some(
      value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  } // end matchSearchTerm

  renderArticles() {
    const { activeId, articles } = this.props;
    const filteredArticles = articles
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return filteredArticles.map(article => (
      <li key={article.id}>
        <Link to={`/articles/${article.id}`} className={activeId === article.id ? 'active' : ''}>
          {article.created_at}
          {' - '}
          {article.title}
        </Link>
      </li>
    ));
  } // end renderArticles

  render() {
    return (
      <section className="articleList">
        <h2>
          Articles
          <Link to="/articles/new">New Article</Link>
        </h2>

        <input
          className="search"
          placeholder="Search"
          type="text"
          ref={this.searchInput}
          onKeyUp={this.updateSearchTerm}
        />

        <ul>{this.renderArticles()}</ul>
      </section>
    );
  } // end render

} // end ArticleList

ArticleList.propTypes = {
  activeId: PropTypes.number,
  articles: PropTypes.arrayOf(PropTypes.object),
};

ArticleList.defaultProps = {
  activeId: undefined,
  articles: [],
};

export default ArticleList;
