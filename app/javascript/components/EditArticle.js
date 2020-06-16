import React from 'react';
import ArticleForm from './ArticleForm';
import { viewArticle, editArticle } from '../actions/index';
import { connect } from 'react-redux';
import { isEmptyObject, validateArticle } from '../helpers/helpers';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';
import moment from 'moment';



class EditArticle extends React.Component {
  handleSubmit(a) {
    a.preventDefault();
    const articleId = this.props.match.params.id;
    const { newArticleFormTitle, newArticleTitle, status, dueDate_input } = a.target;
    const title = newArticleFormTitle.value;
    const text = newArticleFormText.value;
    const due_date = moment(dueDate_input.value, "MM/DD/YYYY").toISOString();
    const article_status = status.checked === true ? "Draft" : "Submitted";

    const { editArticle, history } = this.props;
    const newArticle = {id: articleId, title: title, text: text, due_date: due_date, status: article_status};

    editArticle(newArticle).then((response) => {
      success('Article Updated!');
      const updatedArticle = response.article;
      history.push(`/articles/${updatedArticle.id}`);
    });//.catch(handleAjaxError);
  } // end handleSubmit

  componentDidMount() {
    const { match, viewArticle } = this.props;
    const articleId = match.params.id;
    viewArticle({id: articleId});
  } // end componentDidMount

  render() {
    const { match, article } = this.props;
    //const userId = article.cur_user;
    const articleId = match.params.id;
    let orig_article = {};
    if (article) {
      orig_article = {title: article.title, text: article.text, due_date: article.due_date, status: article.status};
    }

    return (
      <div>
        <ArticleForm page_title="Edit" handleSubmit={this.handleSubmit.bind(this)} cur_article_id={articleId} initialValues={orig_article}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { articles, visibleArticle } = state;
  return {
    isFetching: visibleArticle.isFetching,
    articles: articles.items,
    article: visibleArticle.item,
  };
} // end mapStateToProps

//export default EditArticle;
export default connect(mapStateToProps, {viewArticle, editArticle})(EditArticle)
