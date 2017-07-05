import React, { Component } from 'react';

const CURRENTLY_READING = 'currentlyReading';
const WANT_TO_READ = 'wantToRead';
const READ = 'read';

const SHELVES = {};
SHELVES[CURRENTLY_READING] = 'Currently Reading';
SHELVES[WANT_TO_READ] = 'Want to Read';
SHELVES[READ] = 'Read';

class Library extends React.Component {

  render() {

    let shelves = {};

    Object.keys(SHELVES).forEach((key) => {
      shelves[key] =  {
        title: SHELVES[key],
        books: []
      }
    });

    this.props.books.forEach((book) => {
      let shelf = book.shelf;
      if (shelves[shelf]) {
        shelves[shelf].books.push(book);
      }
    });

    let collection = Object.keys(shelves).map((key) => {
      return shelves[key];
    });

    return (
      <div className="list-books-content">
        {collection.map((shelf) => {
          return (
            <div className="bookshelf-wrapper">
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf">
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelf.books.map((book) => {
                      return (<li key={book.id}>{book.title}</li>);
                    })}
                  </ol>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export { Library };