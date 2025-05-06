import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
export default function HomePage() {
  return (
    <div className="container">
      <navbar className="navbar">
   
        <nav className="navbar nav">
          <Link to="/register">register</Link>
          <br /><br />
          <Link to="/login">login</Link>
        </nav>
      </navbar>
    </div>
  );
}
