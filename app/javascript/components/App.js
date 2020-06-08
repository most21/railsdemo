import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Alert } from '../helpers/notifications';
import Header from './Header';
import ArticleList from './ArticleList';
import CreateArticle from './CreateArticle';
import EditArticle from './EditArticle';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Article from './Article';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => (
  <div>
    <Provider store={store}>
      <Header />
      <div className="grid">
        <Route exact path="/articles" component={ArticleList} />
        <Switch>
          <PropsRoute path="/articles/new" component={CreateArticle} />
          <PropsRoute exact path="/articles/:id/edit" component={EditArticle} />
          <PropsRoute path="/articles/:id" component={Article} />
        </Switch>
      </div>

      <Alert stack={ { limit: 3 }} />
    </Provider>
  </div>
);

export default App;
