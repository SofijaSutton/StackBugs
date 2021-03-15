import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';

function App() {
  return (
    <Router>
    <div>
      <div>
        <nav className='name'>
          <h2 className='sofija'>Sofija Sutton</h2>
          <div className='nav-right'>
            <ul>
            <li><Link to='/'>Projects</Link></li>
            <li><Link to='/'>About</Link></li>
            <li><Link to='/'>Contact</Link></li>
            </ul>
          </div>
        </nav>
      </div>
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
      <div className='footer'>This site is a work in progress, please feel free to reach out! March 2021</div>
    </div>
    </Router>
  );
}

export default App;
