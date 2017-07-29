import React, { Component } from 'react';

const MAX_DESC_CHARS = 90;

const CURRENTLY_READING = 'currentlyReading';
const WANT_TO_READ = 'wantToRead';
const READ = 'read';
const NONE = 'none';

const SHELVES = {};
SHELVES[CURRENTLY_READING] = 'Currently Reading';
SHELVES[WANT_TO_READ] = 'Want to Read';
SHELVES[READ] = 'Read';
SHELVES[NONE] = 'None';

function Book(props) {
  let book = props.book;
  let shelves = Object.keys(SHELVES).map((key) => {
    return {
      id: key,
      text: SHELVES[key]
    }
  });
  return (
    <li>
      <article className="book">
        {book.imageLinks && <img className="book-cover" src={book.imageLinks.thumbnail}/>}
        <h3 className="book-title">{book.title}</h3>
        {book.authors && <h4 className="book-authors">{book.authors.join(', ')}</h4>}
        {book.description && <p className="book-description">{book.description.substring(0, MAX_DESC_CHARS) + '...'}</p>}
        <select onChange={ (e)=> {
            let shelf = e.currentTarget.value;
            props.appInterface.update({ id: book.id }, shelf);
          }}>
          {
            shelves.map((shelf) => {
              return (<option key={shelf.id} value={shelf.id} selected={shelf.id == book.shelf}>{shelf.text}</option>);
            })
          }
        </select>
      </article>
    </li>
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
              return (<Book key={book.id} book={book} appInterface={props.appInterface}/>);
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
      if (key === NONE) {
        return;
      }
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
        return <Shelf key={shelf.id} shelf={shelf} appInterface={props.appInterface}/>
      })}
    </div>
  );
}

function SearchResults(props) {
  return (
    <div className="list-books-content">
      <div className="bookshelf">
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.map((book) => {
              return (<Book key={book.id} book={book} appInterface={props.appInterface}/>);
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export { Library, SearchResults };