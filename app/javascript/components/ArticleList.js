import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { viewAllArticles } from '../actions/index';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.searchInput = React.createRef();
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    //this.matchSearchTerm = this.matchSearchTerm.bind(this);
  } // end constructor

  updateSearchTerm() {
    this.setState({ searchTerm: this.searchInput.current.value });
  } // end updateSearchTerm

  matchSearchTerm(obj) {
    const {
      id, created_at, updated_at, comments, user_id, ...rest
    } = obj;
    const { searchTerm } = this.state;
    return Object.values(rest).some(
      value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  } // end matchSearchTerm

  componentDidMount() {
    const { viewAllArticles } = this.props;
    viewAllArticles();
  } // end componentDidMount

  renderArticles() {
    const { activeId, articles } = this.props;
    const filteredArticles = articles
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return filteredArticles.map(article => (
      <li key={article.id}>
        <Link to={`/articles/${article.id}`} className={activeId === article.id ? 'active' : ''}>
          {article.title}
        </Link>
      </li>
    ));
  } // end renderArticles

  render() {
    const { articles } = this.props;
    const columns = [
      {
        Header: 'Title',
        Cell: (row) => (<Link to={`/articles/${row.original.id}`}>{row.original.title}</Link>),
      },
      {
        Header: 'Author',
        accessor: 'author_email'
      },
      {
        Header: 'Date Created',
        accessor: 'created_at',
      },
      {
        Header: 'action',
        columns: [
          {
            Header: 'Edit',
            Cell: (row) => (<Link to={`/articles/${row.original.id}/edit`}>Edit</Link>),
          },
          {Header: 'Delete'},
        ],
      },
    ];
    const sort = [
      {id: "created_at", desc: "true"}
    ];

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb>
        <section className="articleList">
          <h2>
            Articles
            <Button varient="link" href="/articles/new" style={{color: "black"}}>New Article</Button>
          </h2>

          <input
            className="search"
            placeholder="Search"
            type="text"
            ref={this.searchInput}
            onKeyUp={this.updateSearchTerm}
          />

          <ReactTable data={articles} columns={columns} defaultSorted={sort}/>

        </section>
      </div>
    );
  } // end render

} // end ArticleList

ArticleList.propTypes = {
  activeId: PropTypes.number,
  articles: PropTypes.arrayOf(PropTypes.object),
};

ArticleList.defaultProps = {
  activeId: undefined,
  articles: [],
};


function mapStateToProps(state) {
  const { articles } = state;
  return {
    isFetching: articles.isFetching,
    articles: articles.items
  };
} // end mapStateToProps

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({viewAllArticles}, dispatch)
//   };
// } // end mapDispatchToProps

//export default ArticleList;
//export default connect(mapStateToProps)(ArticleList);
export default connect(mapStateToProps, {viewAllArticles})(ArticleList)
//export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
