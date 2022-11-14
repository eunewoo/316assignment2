/*Navbar that adapts to all pages*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Nav() {
    /*controlling hamburger bar based on click method*/
    const mystyle = {
        backgroundImage: "none",
        backgroundColor: "#87ceeb",
    };
    const [dataFlag, setDataFlag] = useState("false");
    const [dataVisible, setDataVisible] = useState("false");
    const [airaExpanded, setAriaExpanded] = useState(false);
    const [text, setText] = useState("");
    const [style, setStyle] = useState();

    function updateMenu() {
        if (!dataFlag) {
            setDataVisible("true");
            setAriaExpanded(true);
            setText("X");
            setStyle(mystyle);
        } else {
            setDataVisible("false");
            setAriaExpanded(false);
            setText("");
            setStyle();
        }

        setDataFlag(!dataFlag);
    }

    return (
        <>
            <header className="flex primary-header">
                <Logo />
                <button
                    className="mobile-nav-toggle"
                    aria-controls="primary-navigation"
                    aria-expanded={airaExpanded}
                    onClick={updateMenu}
                    style={style}
                >
                    <h>{text}</h>
                </button>
                <nav className="navheader">
                    <ul
                        className="primary-navigation flex"
                        data-visible={dataVisible}
                    >
                        <li>
                            <Link to="/">
                                <span aria-hidden="true">00</span>Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/instructions">
                                <span aria-hidden="true">01</span>Instructions
                            </Link>
                        </li>
                        <li>
                            <Link to="/previous">
                                <span aria-hidden="true">02</span>Enter Previous
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link to="/select">
                                <span aria-hidden="true">03</span>Select Courses
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
