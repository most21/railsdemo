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
import { viewArticle, deleteArticle, clearVisibleArticle, addComment } from '../actions/index';
import { connect } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import moment from 'moment';


class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      current_article_id: '',
    }
  }

  submitComment(c) {
    c.preventDefault();
    const commenter = c.target[0].value;
    const body = c.target[1].value;
    const is_public = c.target[2].checked;
    const articleId = this.props.article.id;
    const comment = {commenter: commenter, body: body, is_public: is_public, article_id: articleId};
    const { history, addComment } = this.props;

    addComment(comment).then((response) => {
      success('Comment Added!');
      const savedComment = response.comment;
      history.push(`/articles/${savedComment.article_id}`);
      window.location.reload(); // again, not sure if necessary but it works
    });//.catch(handleAjaxError);
  }

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
    const date = article ? moment(article.created_at).format("MMMM Do, YYYY [at] h:mmA") : "";

    if (!article) return <ArticleNotFound />;

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/articles">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{article.title}</Breadcrumb.Item>
        </Breadcrumb>

        <div className="articleContainer">
          <h2>
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
            <li><strong>Author:</strong>{' '}{article.author_email}</li>
            <li><strong>Published:</strong>{' '}{date}</li>
          </ul>

          <p>{article.text}</p>

          <br />
          <Comments article={article} />
          <CommentForm handleSubmit={this.submitComment.bind(this)} />
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
export default connect(mapStateToProps, {viewArticle, deleteArticle, clearVisibleArticle, addComment})(Article)
