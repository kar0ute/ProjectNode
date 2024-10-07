import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddEssay from "./components/add-essay.component";
import Essay from "./components/essay.component";
import EssaysList from "./components/essays-list.component";
import Login from "./components/login.component";


class App extends Component {
  render() {
    return (

      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/essays"} className="navbar-brand">
           CodeFactory
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/essays" } className="nav-link">
                Essays
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            <li>
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<EssaysList/>} />
            <Route path="/essays" element={<EssaysList/>} />
            <Route path="/add" element={<AddEssay/>} />
            <Route path="/essays/:id" element={<Essay/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
