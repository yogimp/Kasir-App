import React, { Component } from 'react'
import { NavbarComponent } from './components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home, Success } from './pages';

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/success" element={<Success/>} />
        </Routes>
      </Router>
    )
  }
}
