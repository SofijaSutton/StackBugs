import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';

function App() {
  return (
    <Router>
    <div>
      <div>
        <nav>
          Sofija Sutton
          <div className='nav-right'>
            <Link to='/'>Projects</Link>
            <Link to='/'>About</Link>
            <Link to='/'>Contact</Link>
          </div>
        </nav>
      </div>
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
