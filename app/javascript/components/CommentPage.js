import React from 'react';
import axios from 'axios';
import store from "./store";
import { Provider } from "react-redux";
import CommentForm from './CommentForm';
import { handleAjaxError } from '../helpers/helpers';


class CommentPage extends React.Component {
  submitComment = comment => {
    const articleId = this.props.article.id;
    comment.article_id = articleId;
    comment.user_id = this.props.user;
    axios
      .post(`/api/articles/${articleId}/comments.json`, comment)
      .catch(handleAjaxError);
  } // end addComment
  //submit = values => {
  //  console.log(values);
  //}

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
