import React, { Component } from 'react';

class Library extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <ul>
          {this.props.books.map((book) => {
            return <li key={book.id}>{book.title}</li>
          })}
        </ul>
      </div>);
  }
}

export { Library };