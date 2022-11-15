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
                First, proceed to 'Set Student Id' and enter your 9 digit
                studnet id. Click the Set Student Id button to save it.
                <br></br>
                <br></br>
                Next, proceed to 'Enter Previous Courses.' Click on each course
                you have completed with a C or better grade. Click Set Previous
                Courses.<br></br>
                <br></br>
                Return to the home page and clikc 'Select 'Courses.' Enter your
                name and any search term to restrict course selections with the
                provided string in the course name. This can be left blank to
                see all CSE courses.<br></br>
                <br></br>
                Clikc the checkbox by each course for which you would like to
                register. Click the Register button to register. If you are
                missing prerequisites, you must go back and select a different
                set of courses. In this case, click 'ok' on the alert box and
                try again.
                <br></br>
                <br></br>
                On success, an alert box will indicate the courses for which you
                have registered.
            </p>
        </>
    );
}
