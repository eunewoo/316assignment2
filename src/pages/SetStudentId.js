import React, { useRef } from "react";
import { atom } from "recoil";
import { useRecoilState } from "recoil";
import Nav from "../components/Nav";
import {
    studentIdAtom,
    studentPwAtom,
    studentNameAtom,
    getStudentList,
} from "../model/states";
import { hashutil } from "../hashutil.mjs";

export default function SetStudentId() {
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const [studentId, setStudentId] = useRecoilState(studentIdAtom);
    const [studentName, setStudentName] = useRecoilState(studentNameAtom);
    const [studentPw, setStudentPw] = useRecoilState(studentPwAtom);

    //Reset studentId to -1 if not login successfully
    function search3() {
        setStudentId(() => -1);
    }

    //untillnow
    function search4() {
        localStorage.clear();

        const newInputId = inputRef3.current.value;
        //password: inputRef4.current.value,
        const newInputPw = inputRef4.current.value;

        getStudentList(newInputId).then((list3) => {
            const dbStudentList = list3;
            console.log("StudentRecord", dbStudentList);

            //console.log("inputHash", inputHashPw);
            //set timeout to have enough time to get from db
            const delayInMilliseconds = 100;

            setTimeout(function () {
                if (dbStudentList.length == 0) {
                    alert("Login failed: invalid credentials");
                } else {
                    const inputHashPw = hashutil(
                        dbStudentList[0].first_name,
                        dbStudentList[0].last_name,
                        newInputPw
                    );
                    const Fullname =
                        dbStudentList[0].first_name +
                        dbStudentList[0].last_name;
                    if (inputHashPw == dbStudentList[0].password) {
                        alert(`Logged in: ${newInputId}`);
                        setStudentId(() => inputRef3.current.value);
                        //setStudentName to use in Select courses
                        setStudentName(() => Fullname);
                    } else {
                        alert("Login failed: Wrong password");
                    }
                }
            }, delayInMilliseconds);
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
