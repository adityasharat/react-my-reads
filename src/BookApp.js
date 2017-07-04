import React from 'react';
import * as BooksAPI from './BooksAPI';
import './BookApp.css';
import { Route } from 'react-router-dom';
import { Toolbar } from './Toolbar.js';
import { Library } from './Library.js';

class BooksApp extends React.Component {
  state = {
    query: '',
    books: []
  }

  onQueryChange(query) {
    this.setState({ query });
  }

  getQuery() {
    return this.state.query;
  };

  interface = {
    search: {
      onQueryChange : this.onQueryChange.bind(this),
      getQuery : this.getQuery.bind(this)
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books });
      });
  }

  componentDidUpdate(props, state) {
    if (this.state.query && this.state.query !== state.query) {
      BooksAPI.search(this.state.query, 50)
        .then((books) => {
          this.setState({ books });
        });
    }
  }

  render() {
    return (
      <div>
        <Route path="/" render={({location}) => {
          return (
            <div>
              <Toolbar appInterface={this.interface} isSearchEnabled={location.pathname.startsWith('/search')}/>
              <Library books={this.state.books}/>
            </div>
          )
        }}
        />
      </div>
    );
  }
}

export default BooksApp;
