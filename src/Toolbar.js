import React from 'react';
import { Link } from 'react-router-dom';

class Toolbar extends React.Component {
  render() {
    return (<nav className="navbar navbar-inverse nav-shadow">
              <div className="container-fluid">
                <a className="navbar-brand" href="/">My Reads</a>

                {this.props.isSearchEnabled && <input type="text"
                  onChange={(e) => this.props.appInterface.search.onQueryChange(e.target.value)}
                  value={this.props.appInterface.search.getQuery()}
                  className="search-input"/>
                }

                <Link to="/search" className="search-icon float-right">
                  <i className="fa fa-search" aria-hidden="true"/>
                </Link>
              </div>
            </nav>);
  }
}

export {Toolbar};