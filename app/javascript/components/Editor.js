import React from 'react';
import axios from 'axios';
import Header from './Header';
import ArticleList from './ArticleList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Article from './Article';
import { Switch } from 'react-router-dom';
import ArticleForm from './ArticleForm';
//import CommentPage from './CommentPage';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';
import {viewAllArticles, viewArticle, addArticle, editArticle, deleteArticle, addComments} from "../actions/index";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
    };

    this.addNewArticle = this.addNewArticle.bind(this);
    this.deleteAnArticle = this.deleteAnArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    //this.addComment = this.addComment.bind(this);
  } // end constructor

  componentDidMount() {
    viewAllArticles();
    // axios
    //   .get('/api/articles.json')
    //   .then(response => this.setState({ articles: response.data }))
    //   .catch(handleAjaxError);

  } // end componentDidMount

  addNewArticle(newArticle) {
    const { history } = this.props;

    addArticle(newArticle).then((response) => {
      success('Article Added!');
      const savedArticle = response.data;
      history.push(`/articles/${savedArticle.id}`);
    }).catch(handleAjaxError);
  } // end addArticle

  deleteAnArticle(articleId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      const { history } = this.props;

      deleteArticle({id: articleId}).then((response) => {
        if (response.status === 204) {
          success('Article deleted');
          history.push('/articles');
        }
      }).catch(handleAjaxError);
    }
  } // end deleteArticle

  updateArticle(updatedArticle) {
    const { history } = this.props;

    editArticle(updatedArticle).then((response) => {
      success('Article updated');
      history.push(`/articles/${updatedArticle.id}`)
    }).catch(handleAjaxError);
  } // end updateArticle

  // addComment(articleId, newComment) {
  //   const { history } = this.props;
  //
  //   addComments({})
  //     .catch(handleAjaxError);
  //   // axios
  //   //   .post(`/api/articles/${articleId}/comments.json`, newComment)
  //   //   .then((response) => {
  //   //     success('Comment Added!');
  //   //     const savedComment = response.data;
  //   //     this.setState(prevState => ({
  //   //       articles: [...prevState.articles, savedArticle],
  //   //     }));
  //   //     const { history } = this.props;
  //   //     history.push(`/articles/${savedArticle.id}`);
  //   //   })
  //   //   .catch(handleAjaxError);
  // } // end addComment

  render() {
    const { articles } = this.state;
    if (articles === null) return null;
    const { match } = this.props;
    const articleId = match.params.id;
    const article = articles.find(a => a.id === Number(articleId));

    return (
      <div>
        <Header />
        <div className="grid">
          <ArticleList articles={articles} activeId={Number(articleId)}/>
          <Switch>
            <PropsRoute path="/articles/new" component={ArticleForm} onSubmit={this.addNewArticle} user={articles[0].cur_user} />
            <PropsRoute exact path="/articles/:id/edit" component={ArticleForm} article={article} onSubmit={this.updateArticle} />
            <PropsRoute path="/articles/:id" component={Article} onDelete={this.deleteAnArticle} article={article} user={articles[0].cur_user} />
          </Switch>
        </div>
      </div>
    );
  } // end render

} // end Editor

Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Editor;
