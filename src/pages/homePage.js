import React from "react";
import { Link } from "react-router-dom";
import "../style.css";

export default function HomePage() {
  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>
        View <Link to="/facebook">facebook</Link> on GitHub.
      </p>
    </div>
  );
}
