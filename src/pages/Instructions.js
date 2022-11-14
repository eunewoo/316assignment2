import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

export default function Instructions() {
    return (
        <>
            <Nav />
            <h1 id="subtitle-word">Instructions</h1>
            <br></br>

            <p id="inst-text">
                First, proceed to '02 Enter Previous Courses'. Click on each
                course you have completed with a C or better grade. Click Set
                Previous Courses.
                <br></br>
                <br></br>
                Return to the home page and click '03 Select Courses.' Enter
                your name and any search term to restrict course selections with
                the provided string in the course name. This can be left blank
                to see all CSE courses.<br></br>
                <br></br>
                Click the checkbox by each course for which you would like ot
                register. Click the Register button to register. If you are
                missing prerequisites, you must go back and select a different
                set of courses. In this case, click 'ok' on alert box and try
                again.<br></br>
                <br></br>
                On success, an alert box will indicate the courses for which you
                have registered.
            </p>
        </>
    );
}
