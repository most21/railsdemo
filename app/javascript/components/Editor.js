import React from 'react';
import axios from 'axios';
import Header from './Header';
import ArticleList from './ArticleList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Article from './Article';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
    };
  } // end constructor

  componentDidMount() {
    axios
      .get('/api/articles.json')
      .then(response => this.setState({ articles: response.data }))
      .catch((error) => {
        console.log(error);
      });
  } // end componentDidMount

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
          <PropsRoute path="/articles/:id" component={Article} article={article} />
        </div>
      </div>
    );
  } // end render

} // end Editor

export default Editor;
