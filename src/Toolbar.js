import React from 'react';

class Toolbar extends React.Component {

  render() {
    return (<nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-toolbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/">Brand</a>
                </div>

                <div className="collapse navbar-collapse" id="main-toolbar">
                  <ul className="nav navbar-nav"></ul>
                  <form className="navbar-form navbar-left" role="search">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search"/>
                    </div>
                    <button type="submit" className="btn btn-default">Search</button>
                  </form>
                </div>
              </div>
            </nav>);
  }
}

export {Toolbar};