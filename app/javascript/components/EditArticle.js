import React from 'react';
import ArticleForm from './ArticleForm';
import { viewArticle, editArticle } from '../actions/index';
import { connect } from 'react-redux';
import { isEmptyObject, validateArticle } from '../helpers/helpers';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';



class EditArticle extends React.Component {
  handleSubmit(a) {
    a.preventDefault();
    const articleId = this.props.match.params.id;
    const title = a.target[0].value;
    const text = a.target[1].value;
    const user = a.target[2].value;
    const { history } = this.props;
    const newArticle = {id: articleId, title: title, text: text, user: user};

    const { editArticle } = this.props;
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
    const userId = article.cur_user;
    const articleId = match.params.id;
    const orig_article = {title: article.title, text: article.text};

    return (
      <div>
        <ArticleForm page_title="Edit" handleSubmit={this.handleSubmit.bind(this)} cur_article_id={articleId} user={userId} initialValues={orig_article}/>
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
