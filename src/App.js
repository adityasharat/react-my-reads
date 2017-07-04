import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import { Toolbar } from './Toolbar.js';
import { Library } from './Library.js';

class BooksApp extends React.Component {
  state = {
  };

  render() {
    return (
      <div>
        <Route path="/" render={() => {
          return (
            <div>
              <Toolbar/>
              <Library/>
            </div>
          )
        }}
        />
      </div>
    );
  }
}

export default BooksApp;
