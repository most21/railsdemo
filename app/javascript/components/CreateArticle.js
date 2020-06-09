import React from 'react';
import { isEmptyObject, validateArticle } from '../helpers/helpers';
import ArticleForm from './ArticleForm';
import { addArticle } from '../actions/index';
import { connect } from 'react-redux';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';



class CreateArticle extends React.Component {

  handleSubmit(a) {
    a.preventDefault();
    const title = a.target[0].value;
    const text = a.target[1].value;
    const user = a.target[2].value;

    const article = {title: title, text: text, user_id: user}
    const { history } = this.props;

    // const { article } = this.state;
    // const { history } = this.props;
    const errors = {} //validateArticle(article);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { addArticle } = this.props;
      addArticle(article).then((response) => {
        success('Article Added!');
        const savedArticle = response.article;
        console.log(response.article.id);
        history.push(`/articles/${savedArticle.id}`);
      });//.catch(handleAjaxError);
    }
  } // end handleSubmit

  render() {
    return (
      <div>
        <ArticleForm handleSubmit={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
}

export default connect(null, {addArticle})(CreateArticle)
