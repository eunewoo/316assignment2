import React, { useRef } from "react";
import { atom } from "recoil";
import { useRecoilState } from "recoil";
import Nav from "../components/Nav";
import { studentIdAtom } from "../model/states";

export default function SetStudentId() {
    const inputRef2 = useRef(null);
    const [studentId, setStudentId] = useRecoilState(studentIdAtom);

    function search3() {
        setStudentId(() => inputRef2.current.value);
    }

    return (
        <>
            <h1 id="title-word">CourseMan</h1>
            <Nav />
            <div className="checkbox-collects ">
                <p id="title-word">ID Entry Form</p>
                <div id="username2">
                    <p>ID:</p>
                    <input
                        id="username"
                        name="name"
                        type="text"
                        ref={inputRef2}
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
