import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Toolbar } from './Toolbar.js';

class BooksApp extends React.Component {
  state = {
  };

  render() {
    return (
      <div className="app">
        <Toolbar/>
      </div>
    );
  }
}

export default BooksApp;
