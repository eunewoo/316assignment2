/*02 Enter Previos Courses page
When courses are selected, then they are stored in localSotrage as registered courses
*/
import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import CourseCheckboxList from "../components/CourseCheckboxList";
import {
    searchQueryAtom,
    userAtom,
    studentIdAtom,
    courseListAtom,
} from "../model/states";
import Nav from "../components/Nav";

export default function Previous() {
    const studentId = useRecoilValue(studentIdAtom);
    const [courseList, setCourseList] = useRecoilState(courseListAtom);

    useEffect(() => {
        //const emptyCourseList = [];
        if (studentId == -1) {
            alert("Please set student id before proceeding!");
            //setCourseList(() => []);
        }
    }, []);

    const user = useRecoilValue(userAtom);
    const saveData = () => {
        localStorage.setItem("user", JSON.stringify(user));
    };

    return (
        <>
            <Nav />
            <h1 id="subtitle-word2">Course Man = Update Courses</h1>
            <br></br>

            <div className="checkbox-collects">
                <p>Student ID: {studentId}</p>

                <p>
                    Check off the courses you have completed with a C or better
                </p>

                <CourseCheckboxList />

                <button
                    id="setCourses"
                    onClick={() => {
                        saveData();
                    }}
                >
                    Set Previous Courses
                </button>
            </div>
        </>
    );
}
