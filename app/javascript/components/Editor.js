import React from 'react';
import axios from 'axios';
import Header from './Header';
import ArticleList from './ArticleList';

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

    return (
      <div>
        <Header />
        <ArticleList articles={articles} />
      </div>
    );
  } // end render

} // end Editor

export default Editor;
