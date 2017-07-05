import React, { Component } from 'react';

const CURRENTLY_READING = "currentlyReading";
const WANT_TO_READ = "wantToRead";
const READ = "read";

const SHELVES = new Set();
SHELVES.add(CURRENTLY_READING);
SHELVES.add(WANT_TO_READ);
SHELVES.add(READ);

class Library extends React.Component {

  render() {
    return (
      <div>
        <ul className="shelf-books">
          {this.props.books.map((book) => {
            return <li key={book.id}>{book.title}</li>
          })}
        </ul>
      </div>);
  }
}

export { Library };