import React, { useRef } from "react";
import { atom } from "recoil";
import { useRecoilState } from "recoil";
import Nav from "../components/Nav";
import { studentIdAtom, studentPwAtom, getStudentList } from "../model/states";
//import { hashutil } from "../hashutil.mjs";

export default function SetStudentId() {
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const [studentId, setStudentId] = useRecoilState(studentIdAtom);
    const [studentPw, setStudentPw] = useRecoilState(studentPwAtom);

    function search3() {
        setStudentId(() => inputRef3.current.value);

        setStudentPw(() => inputRef4.current.value);
    }

    //untillnow
    function search4() {
        const newInputId = inputRef3.current.value;
        //password: inputRef4.current.value,

        getStudentList(newInputId).then((list3) => {
            const dbStudentList = list3;
            console.log("StudentRecord", dbStudentList);
        });
    }

    // const newStudent = {
    //     student_id: studentId,
    //     first_name: inputRef.current.value,
    //     last_name: inputRef2.current.value,
    //     password: null,
    // };
    // console.log(newStudent);
    // postStudent(newStudent).then((result) => {
    //     console.log("result", result);
    // });

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
                        search4();
                    }}
                >
                    Set Student Id
                </button>
            </div>
        </>
    );
}
