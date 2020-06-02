import React from 'react';
import axios from 'axios';
import Header from './Header';
import ArticleList from './ArticleList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Article from './Article';
import { Switch } from 'react-router-dom';
import ArticleForm from './ArticleForm';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
    };

    this.addArticle = this.addArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  } // end constructor

  componentDidMount() {
    axios
      .get('/api/articles.json')
      .then(response => this.setState({ articles: response.data }))
      .catch((error) => {
        console.log(error);
      });
  } // end componentDidMount

  addArticle(newArticle) {
    axios
      .post('/api/articles.json', newArticle)
      .then((response) => {
        alert('Article Added!');
        const savedArticle = response.data;
        this.setState(prevState => ({
          articles: [...prevState.articles, savedArticle],
        }));
        const { history } = this.props;
        history.push(`/articles/${savedArticle.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  } // end addArticle

  deleteArticle(articleId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/articles/${articleId}.json`)
        .then((response) => {
          if (response.status === 204) {
            alert('Article deleted');
            const { history } = this.props;
            history.push('/articles');

            const { articles } = this.state;
            this.setState({ articles: articles.filter(article => article.id !== articleId) });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } // end deleteArticle

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
            <PropsRoute path="/articles/new" component={ArticleForm} onSubmit={this.addArticle} />
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
