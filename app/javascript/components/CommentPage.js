import React from 'react';
import axios from 'axios';
import store from "./store";
import { Provider } from "react-redux";
import CommentForm from './CommentForm';
import { handleAjaxError } from '../helpers/helpers';
import { success } from '../helpers/notifications';



class CommentPage extends React.Component {
  submitComment = comment => {
    const articleId = this.props.article.id;
    comment.article_id = articleId;
    comment.user_id = this.props.user;
    axios
      .post(`/api/articles/${articleId}/comments.json`, comment)
      .then((response) => {
        success('Article Added!');
        const { history } = this.props;
        history.push(`/articles/${articleId}`);
      })
      .catch(handleAjaxError);
  } // end addComment

  render() {
    return (
      <Provider store={store}>
        <div>
          <CommentForm onSubmit={this.submitComment} />
        </div>
      </Provider>
    );
  } // end render

} // end CommentPage

export default CommentPage;
