import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Alert } from '../helpers/notifications';
import Header from './Header';
import ArticleList from './ArticleList';
import CreateArticle from './CreateArticle';
import EditArticle from './EditArticle';
import Article from './Article';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div>
    <Provider store={store}>
      <Header />
      <div className="grid">
        <Switch>
          <Route exact path="/articles" component={ArticleList} />
          <Route exact path="/articles/new" component={CreateArticle} />
          <Route exact path="/articles/:id/edit" component={EditArticle} />
          <Route exact path="/articles/:id" component={Article} />
        </Switch>
      </div>

      <Alert stack={ { limit: 3 }} />
    </Provider>
  </div>
);

export default App;
