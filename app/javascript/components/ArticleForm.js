import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validateArticle } from '../helpers/helpers';
import { Link } from 'react-router-dom';
import { viewAllArticles, addArticle } from '../actions/index';
import { connect } from 'react-redux';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';


class ArticleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: props.article,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
  } // end constructor

  handleSubmit(a) {
    a.preventDefault();
    const { article } = this.state;
    const { history } = this.props;
    const errors = validateArticle(article);

    article.user_id = this.props.articles[0].cur_user;


    console.log(article);
    console.log(this.props);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { addArticle } = this.props;
      addArticle(article).then((response) => {
        success('Article Added!');
        const savedArticle = response.article.id;
        console.log(response.article.id);
        history.push(`/articles/${savedArticle.id}`);
      });//.catch(handleAjaxError);
    }
  } // end handleSubmit

  handleInputChange(article) {
    const { target } = article;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(prevState => ({
      article: {
        ...prevState.article,
        [name]: value,
      },
    }));
  } // end handleInputChange

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the article from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  } // end renderErrors

  componentDidMount() {
    const { viewAllArticles } = this.props;
    viewAllArticles();
  } // end componentDidMount

  componentWillReceiveProps({ article }) {
    this.setState({ article });
  } // end componentWillReceiveProps

  render() {
    const { article } = this.state;
    const { path } = this.props;

    if (!article.id && path === '/articles/:id/edit') return <ArticleNotFound />;

    const cancelURL = article.id ? `/articles/${article.id}` : '/articles';
    const title = article.id ? 'Edit Article' : 'New Article';

    return (
      <div>
        <h2>{title}</h2>

        {this.renderErrors()}

        <form className="articleForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">
              <strong>Title:</strong>
              <input type="text" id="title" name="title" onChange={this.handleInputChange} value={article.title}/>
            </label>
          </div>
          <div>
            <label htmlFor="text">
              <strong>Text:</strong>
              <textarea cols="30" rows="10" id="text" name="text" onChange={this.handleInputChange} value={article.text}/>
            </label>
          </div>
          <div>
            <label htmlFor="user_id">
              <input hidden readOnly type="text" id="user_id" name="user_id" value={article.user_id}/>
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  } // end render
} // end ArticleForm

ArticleForm.propTypes = {
  article: PropTypes.shape(),
  //onSubmit: PropTypes.func.isRequired,
  //path: PropTypes.string.isRequired,
};

ArticleForm.defaultProps = {
  article: {
    title: '',
    text: '',
    user_id: '',
  },
};

function mapStateToProps(state) {
  const { articles } = state;
  return {
    isFetching: articles.isFetching,
    articles: articles.items
  };
} // end mapStateToProps

//export default ArticleForm;
export default connect(mapStateToProps, {viewAllArticles, addArticle})(ArticleForm)
