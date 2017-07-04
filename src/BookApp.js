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
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        console.error(books);
        this.setState({ books });
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Route path="/" render={() => {
          return (
            <div>
              <Toolbar/>
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
