import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArticleNotFound from './ArticleNotFound';
import CommentForm from './CommentForm';
import Comments from './Comments'
import store from "./store";
import { Provider } from "react-redux";
import { handleAjaxError } from '../helpers/helpers';
import axios from 'axios';
import { success } from '../helpers/notifications';


//const submitComment = comment => {
  //console.log(comment);
  // const articleId = this.props.article.id;
  // comment.article_id = articleId;
  // comment.user_id = this.props.user;
  // axios
  //   .post(`/api/articles/${articleId}/comments.json`, comment)
  //   .then((response) => {
  //     success('Article Added!');
  //     const { history } = this.props;
  //     history.push(`/articles/${articleId}`);
  //   })
  //   .catch(handleAjaxError);
//} // end addComment

class Article extends React.Component {
  submitComment(c) {
    console.log(c);
    console.log(this.props);
    const articleId = this.props.article.id;
    const userId = this.props.user;
    const comments = c.comments;
    console.log(comments)
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
    const { history } = this.props;
    history.push(`/articles/${articleId}`);
    // axios
    //   .post(`/api/articles/${articleId}/comments.json`, comment)
    //   .then((response) => {
    //     success('Article Added!');
    //     const { history } = this.props;
    //     history.push(`/articles/${articleId}`);
    //   })
    //   .catch(handleAjaxError);

  } // end submitComment

  render() {
    const { article, onDelete, user } = this.props;
    if (!article) return <ArticleNotFound />;

    return (
      <div className="articleContainer">
        <h2>
          {article.created_at}
          {' - '}
          {article.title}
          {' '}
          <Link to={`/articles/${article.id}/edit`}>Edit</Link>
          <button className="delete" type="button" onClick={() => onDelete(article.id)}>
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
        <Provider store={store}>
          <div>
            <CommentForm onSubmit={this.submitComment.bind(this)} article={article} user={user} />
          </div>
        </Provider>
      </div>
    );
  } // end render
} // end Article

// const Article = ({ article, onDelete, user }) => {
//   if (!article) return <ArticleNotFound />;
//
//   return (
//     <div className="articleContainer">
//       <h2>
//         {article.created_at}
//         {' - '}
//         {article.title}
//         {' '}
//         <Link to={`/articles/${article.id}/edit`}>Edit</Link>
//         <button className="delete" type="button" onClick={() => onDelete(article.id)}>
//           Delete
//         </button>
//       </h2>
//       <ul>
//         <li>
//           <strong>Title:</strong>
//           {' '}
//           {article.title}
//         </li>
//         <li>
//           <strong>Author:</strong>
//           {' '}
//           {article.author_email}
//         </li>
//         <li>
//           <strong>Date:</strong>
//           {' '}
//           {article.created_at}
//         </li>
//         <li>
//           <strong>Text:</strong>
//           {' '}
//           {article.text}
//         </li>
//       </ul>
//       <br />
//       <Comments article={article} />
//       <Provider store={store}>
//         <div>
//           <CommentForm onSubmit={submitComment} article={article} user={user} />
//         </div>
//       </Provider>
//     </div>
//   );
// } // end Article

Article.propTypes = {
  article: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

Article.defaultProps = {
  article: undefined,
};

export default Article;
