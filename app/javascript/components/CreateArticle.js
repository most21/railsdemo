import React from 'react';
import { isEmptyObject, validateArticle } from '../helpers/helpers';
import ArticleForm from './ArticleForm';
import { viewAllArticles, addArticle } from '../actions/index';
import { connect } from 'react-redux';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';
import moment from 'moment';


class CreateArticle extends React.Component {
  handleSubmit(a) {
    a.preventDefault();
    const { newArticleFormTitle, newArticleTitle, status, dueDate_input } = a.target;
    const title = newArticleFormTitle.value;
    const text = newArticleFormText.value;
    const due_date = moment(dueDate_input.value, "MM/DD/YYYY").toISOString();
    const article_status = status.checked === true ? "Draft" : "Submitted";

    const article = {title: title, text: text, due_date: due_date, status: article_status};
    const { addArticle, history } = this.props;

    addArticle(article).then((response) => {
      success('Article Added!');
      const savedArticle = response.article;
      history.push(`/articles/${savedArticle.id}`);
    });//.catch(handleAjaxError);
  } // end handleSubmit

  componentDidMount() {
    const { viewAllArticles } = this.props;
    viewAllArticles();
  } // end componentDidMount

  render() {
    //const userId = this.props.articles[0].cur_user;
    return (
      <div>
        <ArticleForm page_title="New" handleSubmit={this.handleSubmit.bind(this)} initialValues={{title: "", text: "", due_date: "", status: "Draft"}}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { articles } = state;
  return {
    isFetching: articles.isFetching,
    articles: articles.items
  };
} // end mapStateToProps

export default connect(mapStateToProps, {viewAllArticles, addArticle})(CreateArticle)
