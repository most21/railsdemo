import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArticleNotFound from './ArticleNotFound';
import ArticleList from './ArticleList';
import CommentForm from './CommentForm';
import Comments from './Comments'
import store from "./store";
import { Provider } from "react-redux";
import { handleAjaxError } from '../helpers/helpers';
import axios from 'axios';
import { success } from '../helpers/notifications';
import { viewArticle, deleteArticle, clearVisibleArticle } from '../actions/index';
import { connect } from 'react-redux';


class Article extends React.Component {
  // submitComment(c) {
  //   console.log(c);
  //   console.log(this.props);
  //   const articleId = this.props.article.id;
  //   const userId = this.props.user;
  //   const comments = c.comments;
  //   console.log(comments)
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
  //   const { history } = this.props;
  //   history.push(`/articles/${articleId}`);
  //   // axios
  //   //   .post(`/api/articles/${articleId}/comments.json`, comment)
  //   //   .then((response) => {
  //   //     success('Article Added!');
  //   //     const { history } = this.props;
  //   //     history.push(`/articles/${articleId}`);
  //   //   })
  //   //   .catch(handleAjaxError);
  //
  // } // end submitComment

  constructor(props) {
    super(props);

    this.state = {
      user: '',
      current_article_id: '',
    }

    //this.handleDelete = this.handleDelete.bind(this);
  }

  dummyComment() {
    return
  }

  // handleDelete(attr) {
  //   const { history } = this.props;
  //   deleteArticle(attr).then((response) => {
  //       success('Article Deleted!');
  //       history.push('/articles');
  //     });
  // }

  componentDidMount() {
    const { match, viewArticle } = this.props;
    const articleId = match.params.id;
    viewArticle({id: articleId}).then(response => {
      this.setState({current_article_id: this.props.article.id, user: this.props.article.cur_user})
    });
  } // end componentDidMount

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchData(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    const { clearVisibleArticle } = this.props;
    clearVisibleArticle();
  } // end componentWillUnmount

  render() {
    const { history, article, deleteArticle } = this.props;
    if (!article) return <ArticleNotFound />;

    return (
      <div className="articleContainer">
        <Link to={'/articles'}>Home</Link>
        <h2>
          {article.created_at}
          {' - '}
          {article.title}
          {' '}
          <Link to={`/articles/${article.id}/edit`}>Edit</Link>
          <button className="delete" type="button" onClick={() => deleteArticle({id: article.id}).then((response) => {
              success('Article Deleted!');
              history.push('/articles');
            })}>
            Delete
          </button>
        </h2>
        <ul>
          <li>
            <strong>Title:</strong>
            {' '}
            {article.title}
          </li>
          <li>
            <strong>Author:</strong>
            {' '}
            {article.author_email}
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
        </ul>
        <br />
        <Comments article={article} />
        <div>
          <CommentForm onSubmit={this.dummyComment.bind(this)} article={article} user={this.state.user} />
        </div>
      </div>
    );
  } // end render
} // end Article


Article.propTypes = {
  article: PropTypes.shape(),
  //onDelete: PropTypes.func.isRequired,
};

Article.defaultProps = {
  article: undefined,
};

function mapStateToProps(state) {
  const { visibleArticle } = state;
  return {
    isFetching: visibleArticle.isFetching,
    article: visibleArticle.item
  };
} // end mapStateToProps

//export default Article;
export default connect(mapStateToProps, {viewArticle, deleteArticle, clearVisibleArticle})(Article)
