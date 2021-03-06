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
    books: [],
    results: []
  }

  onQueryChange(query) {
    this.setState({ query });
  }

  getQuery() {
    return this.state.query;
  };

  update(book, shelf) {
    // check if the current shelf != new shelf
    if (book.shelf !== shelf) {
      book.shelf = shelf;
      BooksAPI.update(book, shelf)
        .then(() => {
          this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat([ book ])
         }));
        });
    }
  }

  fetchBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books });
      });
  }

  fixSearchResults(results) {
    let books = this.state.books;

    results.forEach((result) => {
      let book = books.find(book => book.id === result.id);
      if (book) {
        result.shelf = book.shelf;
      } else {
        result.shelf = 'none';
      }
    });
    return results;
  }

  interface = {
    search: {
      onQueryChange : this.onQueryChange.bind(this),
      getQuery : this.getQuery.bind(this)
    },
    update: this.update.bind(this)
  }

  componentDidMount() {
    this.fetchBooks();
  }

  componentDidUpdate(props, state) {
    if (this.state.query && this.state.query !== state.query) {
      BooksAPI.search(escapeStringRegexp(this.state.query), 50)
        .then((books) => {
          if (books instanceof Array) {
            this.setState({ results: this.fixSearchResults(books) });
          } else {
            this.setState({
              results: []
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
              <Library className="search-books-results" books={this.state.books} appInterface={this.interface}/>
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
                <SearchResults className="search-books-results" books={this.state.results} appInterface={this.interface}/>
              </div>
            )
        }}/>

      </div>
    );
  }
}

export default BooksApp;
