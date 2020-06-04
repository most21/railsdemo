import React from 'react';
import store from "./store";
import { Provider } from "react-redux";
import CommentForm from './CommentForm';

class CommentPage extends React.Component {
  //submit = values => {
  //  console.log(values);
  //}

  render() {
    return (
      <Provider store={store}>
        <div>
          <CommentForm onSubmit={this.props.onSubmit} />
        </div>
      </Provider>
    );
  } // end render

} // end CommentPage

export default CommentPage;
