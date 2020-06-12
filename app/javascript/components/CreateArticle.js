import React from 'react';
import { isEmptyObject, validateArticle } from '../helpers/helpers';
import ArticleForm from './ArticleForm';
import { viewAllArticles, addArticle } from '../actions/index';
import { connect } from 'react-redux';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';



class CreateArticle extends React.Component {

  handleSubmit(a) {
    a.preventDefault();
    const title = a.target[0].value;
    const text = a.target[1].value;

    const article = {title: title, text: text};
    const { history } = this.props;

    const { addArticle } = this.props;
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
        <ArticleForm page_title="New" handleSubmit={this.handleSubmit.bind(this)} initialValues={{title: "", text: ""}}/>
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
