import React from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
  render() {
    return (
      <div className="search-books-bar">
        <Link className="close-search" to="/"/>
        <div className="search-books-input-wrapper">
            <input type="text" onChange={(e) => this.props.appInterface.search.onQueryChange(e.target.value)}
                   value={this.props.appInterface.search.getQuery()}/>
        </div>
      </div>
    );
  }
}

export { SearchBar };