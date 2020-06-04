import React from 'react';
import axios from 'axios';
import Header from './Header';
import ArticleList from './ArticleList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Article from './Article';
import { Switch } from 'react-router-dom';
import ArticleForm from './ArticleForm';
import CommentPage from './CommentPage';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
    };

    this.addArticle = this.addArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.addComment = this.addComment.bind(this);
  } // end constructor

  componentDidMount() {
    axios
      .get('/api/articles.json')
      .then(response => this.setState({ articles: response.data }))
      .catch(handleAjaxError);
  } // end componentDidMount

  addArticle(newArticle) {
    axios
      .post('/api/articles.json', newArticle)
      .then((response) => {
        success('Article Added!');
        const savedArticle = response.data;
        this.setState(prevState => ({
          articles: [...prevState.articles, savedArticle],
        }));
        const { history } = this.props;
        history.push(`/articles/${savedArticle.id}`);
      })
      .catch(handleAjaxError);
  } // end addArticle

  deleteArticle(articleId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/articles/${articleId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Article deleted');
            const { history } = this.props;
            history.push('/articles');

            const { articles } = this.state;
            this.setState({ articles: articles.filter(article => article.id !== articleId) });
          }
        })
        .catch(handleAjaxError);
    }
  } // end deleteArticle

  updateArticle(updatedArticle) {
  axios
    .put(`/api/articles/${updatedArticle.id}.json`, updatedArticle)
    .then(() => {
      success('Article updated');
      const { articles } = this.state;
      const idx = articles.findIndex(article => article.id === updatedArticle.id);
      articles[idx] = updatedArticle;
      const { history } = this.props;
      history.push(`/articles/${updatedArticle.id}`);
      this.setState({ articles });
    })
    .catch(handleAjaxError);
  } // end updateArticle

  addComment(articleId, newComment) {
    console.log(articleId);
    console.log(newComment);
    axios
      .post(`/api/articles/${articleId}/comments.json`, newComment)
      .catch(handleAjaxError);
    // axios
    //   .post(`/api/articles/${articleId}/comments.json`, newComment)
    //   .then((response) => {
    //     success('Comment Added!');
    //     const savedComment = response.data;
    //     this.setState(prevState => ({
    //       articles: [...prevState.articles, savedArticle],
    //     }));
    //     const { history } = this.props;
    //     history.push(`/articles/${savedArticle.id}`);
    //   })
    //   .catch(handleAjaxError);
  } // end addComment

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
            <PropsRoute path="/articles/new" component={ArticleForm} onSubmit={this.addArticle} user={articles[0].cur_user} />
            <PropsRoute path="/articles/:id/comments" component={CommentPage} article={article} onSubmit={this.addComment} user={articles[0].cur_user} />
            <PropsRoute exact path="/articles/:id/edit" component={ArticleForm} article={article} onSubmit={this.updateArticle} />
            <PropsRoute path="/articles/:id" component={Article} article={article} onDelete={this.deleteArticle} />
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
