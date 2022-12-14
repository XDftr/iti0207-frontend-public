import logo from "../assets/logo.svg";
import "../assets/styles/HomePage.css"
import Navbar from "../components/layout/navigation/Navbar";
import React from "react";

function HomePage() {
    return (
        <div className="Homepage">
            <Navbar />
            <header className="Homepage-header">
                <img src={logo} className="Homepage-logo" alt="logo" />
                <p>
                    Edit <code>src/Homepage.js</code> and save to reload.
                </p>
                <a
                    className="Homepage-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default HomePage;