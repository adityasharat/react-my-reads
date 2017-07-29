import React from 'react';
import * as BooksAPI from './BooksAPI';
import escapeStringRegexp from 'escape-string-regexp';
import './BookApp.css';
import { Route } from 'react-router-dom';
import { Toolbar } from './Toolbar.js';
import { Library, SearchResults } from './Library.js';
import { SearchBar } from './SearchBar.js';
import { Link } from 'react-router-dom';

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
      BooksAPI.search(escapeStringRegexp(this.state.query), 50)
        .then((books) => {
          console.info(typeof books);
          console.info(books);
          if (books instanceof Array) {
            this.setState({ books });
          } else {
            this.setState({
              books: []
            })
          }
        });
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => {
          return (
            <div>
              <Toolbar/>
              <Library className="search-books-results" books={this.state.books}/>
              <div className = "open-search">
                <Link to="/search" className="search-icon float-right">
                  <i className="fa fa-plus-circle" aria-hidden="true"/>
                </Link>
              </div>
            </div>
          )
        }}/>
        <Route path="/search" render={() => {
          return (
              <div>
                <SearchBar appInterface={this.interface}/>
                <SearchResults className="search-books-results" books={this.state.books}/>
              </div>
            )
        }}/>

      </div>
    );
  }
}

export default BooksApp;
