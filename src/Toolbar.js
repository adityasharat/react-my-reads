import React from 'react';
import { Link } from 'react-router-dom';

class Toolbar extends React.Component {

  render() {
    return (<nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <a className="navbar-brand" href="/">My Reads</a>
                <Link to="/search" className="search-icon float-right">
                  <i className="fa fa-search" aria-hidden="true"/>
                </Link>
              </div>
            </nav>);
  }
}

export {Toolbar};