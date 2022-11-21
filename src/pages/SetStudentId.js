import React, { useRef } from "react";
import { atom } from "recoil";
import { useRecoilState } from "recoil";
import Nav from "../components/Nav";
import { studentIdAtom, studentPwAtom } from "../model/states";

export default function SetStudentId() {
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const [studentId, setStudentId] = useRecoilState(studentIdAtom);

    function search3() {
        setStudentId(() => inputRef3.current.value);
    }

    function search4() {
        setStudentId(() => inputRef4.current.value);
    }

    return (
        <>
            <h1 id="title-word">CourseMan</h1>
            <Nav />
            <div className="checkbox-collects ">
                <p id="title-word">Login Form</p>
                <div id="username2">
                    <p>ID:</p>
                    <input
                        id="username"
                        name="name"
                        type="text"
                        ref={inputRef3}
                    />
                    <p></p>
                </div>
                <div id="username2">
                    <p>Password:</p>
                    <input
                        id="username"
                        name="password"
                        type="text"
                        ref={inputRef4}
                    />
                    <p></p>
                </div>
                <button
                    id="setCourses"
                    onClick={() => {
                        search3();
                    }}
                >
                    Set Student Id
                </button>
            </div>
        </>
    );
}
