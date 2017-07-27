import React, { Component } from 'react';

const CURRENTLY_READING = 'currentlyReading';
const WANT_TO_READ = 'wantToRead';
const READ = 'read';

const SHELVES = {};
SHELVES[CURRENTLY_READING] = 'Currently Reading';
SHELVES[WANT_TO_READ] = 'Want to Read';
SHELVES[READ] = 'Read';

function Book(props) {
  return (
    <li>{props.book.title}</li>
  );
}

function Shelf(props) {
  return (
     <div className="bookshelf-wrapper">
      <h2 className="bookshelf-title">{props.shelf.title}</h2>
      <div className="bookshelf">
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.shelf.books.map((book) => {
              return (<Book key={book.id} book={book}/>);
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

function getCollection(books) {
  let shelves = {};

  Object
    .keys(SHELVES)
    .forEach((key) => {
      shelves[key] = {
        id: key,
        title: SHELVES[key],
        books: []
      }
    });

  books.forEach((book) => {
    let shelf = book.shelf;
    if (shelves[shelf]) {
      shelves[shelf]
        .books
        .push(book);
    }
  });

  return Object
    .keys(shelves)
    .map((key) => {
      return shelves[key];
    });
}

function Library(props) {
  let collection = getCollection(props.books);
  return (
    <div className="list-books-content">
      {collection.map((shelf) => {
        return <Shelf key={shelf.id}  shelf={shelf}/>
      })}
    </div>
  );
}

function SearchResults(props) {
  console.log(props.books);
  return (
    <div className="list-books-content">
      <div className="bookshelf">
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.map((book) => {
              return (<Book key={book.id} book={book}/>);
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export { Library, SearchResults };