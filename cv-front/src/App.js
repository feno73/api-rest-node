import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddCV from './components/AddCV';
import CV from './components/CV';
import ListCV from './components/ListCV';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/cvs" className="navbar-brand">CV Generator</a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/cvs"} className="nav-link">
              CVs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/agregar"} className="nav-link">
              Agregar CV
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/cvs"]} component={ListCV} />
          <Route exact path="/agregar" component={AddCV} />
          <Route path="/cvs/:id" component={CV} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
