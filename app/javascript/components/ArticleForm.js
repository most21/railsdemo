import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { viewArticle } from '../actions/index';
import { connect } from 'react-redux';
import { isEmptyObject } from '../helpers/helpers';
import { Field, reduxForm, initialize } from "redux-form";
import FormField from "./shared/FormField";
import TextAreaFormField from "./shared/TextAreaFormField";
import HiddenFormField from "./shared/HiddenFormField";

// Field-level validation functions
const required = value => value ? undefined : 'Required';
const minLength = min => value =>
  value && value.length < min ? `Must be at least ${min} characters` : undefined
const minLength5 = minLength(5)


class ArticleForm extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   // this.state = {
  //   //   article: props.article,
  //   //   errors: {},
  //     //pre_load_article: {},
  //   };

    //this.handleInputChange = this.handleInputChange.bind(this);
  //} // end constructor

  // handleInputChange(article) {
  //   console.log('handling input change');
  //   const { target } = article;
  //   const { name } = target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const err = this.validateArticle(name, value);
  //
  //   this.setState(prevState => ({
  //     article: {
  //       ...prevState.article,
  //       [name]: value,
  //       user_id: this.props.articles[0].cur_user,
  //     },
  //     errors: err,
  //   }));
  // } // end handleInputChange
  //
  // renderErrors() {
  //   const { errors } = this.state;
  //
  //   if (isEmptyObject(errors)) {
  //     return null;
  //   }
  //
  //   return (
  //     <div className="errors">
  //       <h3>The following errors prohibited the article from being saved:</h3>
  //       <ul>
  //         {Object.values(errors).map(error => (
  //           <li key={error}>{error}</li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // } // end renderErrors

  // componentDidMount() {
  //   if (this.props.title === "Edit") {
  //     const { viewArticle } = this.props;
  //     const articleId = this.props.cur_article_id;
  //     viewArticle({id: articleId}).then(response => {
  //       this.setState({article: this.props.article})//, user: this.props.article.cur_user})
  //     });
  //   }
  // } // end componentDidMount

  // componentWillReceiveProps({ article }) {
  //   console.log('INSIDE componentWillReceiveProps');
  //   this.setState({ article });
  // } // end componentWillReceiveProps

  render() {
    console.log(this.props);
    const { article, invalid, submitting, pristine } = this.props;

    //if (!article.id === '/articles/:id/edit') return <ArticleNotFound />;

    const cancelURL = article.id ? `/articles/${article.id}` : '/articles';
    const userId = this.props.user;

    return (
      <div>
        <h2>{`${this.props.page_title} Article`}</h2>

        <form className="articleForm" onSubmit={this.props.handleSubmit}>
          <Field name="title" type="text" component={FormField} label="Title" validate={[ required, minLength5 ]}/>
          <Field name="text" component={TextAreaFormField} label="Text" validate={[ required ]}/>
          <Field name="user_id" component={HiddenFormField} user={userId}/>
          <div className="form-actions">
            <button type="submit" disabled={invalid || submitting || pristine}>Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  } // end render
} // end ArticleForm

ArticleForm.propTypes = {
  article: PropTypes.shape(),
  //onSubmit: PropTypes.func.isRequired,
  //path: PropTypes.string.isRequired,
};

ArticleForm.defaultProps = {
  article: {
    title: '',
    text: '',
    user_id: '',
  },
};

function mapStateToProps(state) {
  const { visibleArticle, articles } = state;
  return {
    isFetching: articles.isFetching,
    articles: articles.items,
    article: visibleArticle.item,
  };
} // end mapStateToProps

//export default ArticleForm;
ArticleForm = connect(mapStateToProps, {viewArticle})(ArticleForm);

ArticleForm = reduxForm({
  form: "ArticleForm",
  enableReinitialize: true,
})(ArticleForm);

export default ArticleForm;
