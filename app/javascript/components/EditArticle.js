import React from 'react';
import ArticleForm from './ArticleForm';
import { editArticle } from '../actions/index';
import { connect } from 'react-redux';
import { isEmptyObject, validateArticle } from '../helpers/helpers';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';



class EditArticle extends React.Component {
  handleSubmit(a) {
    console.log('clicked submit');
    //console.log(this.props);

    a.preventDefault();
    const articleId = this.props.match.params.id;
    const title = a.target[0].value;
    const text = a.target[1].value;
    const user = a.target[2].value;
    const { history } = this.props;
    const newArticle = {id: articleId, title: title, text: text, user: user};

    //editArticle(newArticle);//.then((response) => {
    //   success('Article updated!');
    //   const updatedArticle = response.article;
    //   history.push(`/articles/${updatedArticle.id}`)
    // }).catch(handleAjaxError);

    const errors = {} //validateArticle(article);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { editArticle } = this.props;
      editArticle(newArticle).then((response) => {
        success('Article Updated!');
        const updatedArticle = response.article;
        history.push(`/articles/${updatedArticle.id}`);
      });//.catch(handleAjaxError);
    }
  }

  render() {
    return (
      <div>
        <ArticleForm page_title="Edit" handleSubmit={this.handleSubmit.bind(this)} cur_article_id={this.props.match.params.id}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { visibleArticle } = state;
  return {
    isFetching: visibleArticle.isFetching,
    article: visibleArticle.item
  };
} // end mapStateToProps

//export default EditArticle;
export default connect(mapStateToProps, {editArticle})(EditArticle)
