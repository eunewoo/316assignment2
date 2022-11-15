/*02 Select Courses page
When "search courses" button is clicked, all courses are stored in localStorage
When "register" button is clicked, the site shows alert
You can keep check the avaliability of course registration on specific person
*/
import React, { useState, useRef } from "react";
import CourseCheckboxList from "../components/CourseCheckboxList";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
    courseListAtom,
    searchQueryAtom,
    userAtom,
    postStudent,
    studentIdAtom,
} from "../model/states";
import Nav from "../components/Nav";

export default function Select() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchingValue, setSearchingValue] = useState("");
    const [courseList, setCourseList] = useRecoilState(courseListAtom);
    const [user, setUser] = useRecoilState(userAtom);

    const setSearchQuery = useSetRecoilState(searchQueryAtom);

    /**
     * register function (about db or localstorage)
     */
    const register = () => {
        const dbUser = JSON.parse(localStorage.getItem("user"));
        const dbCourseList = JSON.parse(localStorage.getItem("courseList"));
        // for saving
        const finalRegiList = [...dbUser.registering];
        const finalCourseList = [...courseList];

        let processed = [];

        for (let i = 0; i < courseList.length; i++) {
            const course = courseList[i];
            const id = course.id;

            // if not registering
            if (!user.registering.includes(id)) {
                continue;
            }

            // is there remaining seat?
            if (dbCourseList[i].seatsRemaining === 0) {
                processed.push({
                    id,
                    msg: `No seat for ${id}`,
                    courseIdx: i,
                });
            } else if (dbUser.registered.includes(id)) {
                // have you taken?
                processed.push({
                    id,
                    msg: `You already had taken ${id}`,
                    courseIdx: i,
                });
            } else if (dbUser.registering.includes(id)) {
                // already registered for this seme?
                processed.push({
                    id,
                    msg: `Courses Succesfully Registered: ${id}`,
                    courseIdx: i,
                    isSuccess: true,
                });
            } else {
                // did i take prereq?
                const prereq = course.prerequistes;
                let requires = [];
                for (let j = 0; j < prereq.length; j++) {
                    if (!dbUser.registered.includes(prereq[j])) {
                        requires.push(prereq[j]);
                    }
                }
                // there is not taken prereq.
                if (requires.length > 0) {
                    processed.push({
                        id,
                        msg: `${id} requires ${requires.join(", ")}`,
                        courseIdx: i,
                    });
                } else {
                    processed.push({
                        id,
                        msg: `Courses Succesfully Registered: ${id}`,
                        courseIdx: i,
                        isSuccess: true,
                    });
                }
            }
        }

        for (let k = 0; k < processed.length; k++) {
            for (let j = user.registering.length - 1; j >= 0; j--) {
                if (user.registering[j] == processed[k].id) {
                    // destructuring
                    const { id, courseIdx, isSuccess, msg } = processed[k];

                    if (isSuccess) {
                        //finalRegiList.push(id);
                    } else {
                        console.log(finalCourseList[courseIdx]);
                        finalCourseList[courseIdx] = {
                            ...finalCourseList[courseIdx],
                            seatsRemaining:
                                finalCourseList[courseIdx].seatsRemaining + 1,
                        };
                    }
                    alert(msg);
                }
            }
        }
    };

    /**
     * search function
     */
    const search = () => {
        setSearchQuery(() => searchingValue.toLowerCase());

        if (isOpen == true) {
            setIsOpen(() => false);
        } else if (isOpen == false) {
            setIsOpen(() => true);
        }

        localStorage.setItem("courseList", JSON.stringify(courseList));
    };

    /* When Click Search Courses button:
    deal with name input & showing register button & changing button text betwween "Select Courses" and "Hide" */
    const inputRef = useRef(null);
    const [text, setText] = useState("");
    const [changingText, setChangingText] = useState("Search Courses");
    const [dataVisible, setDataVisible] = useState("false");
    const [registerHidden, setRegisterHidden] = useState("hidden");

    function search2() {
        if (dataVisible) {
            setText(
                inputRef.current.value + " here are the courses you may select."
            );
            setChangingText("Hide");
            setRegisterHidden("");
        } else {
            setText("");
            setChangingText("Select Courses");
            setRegisterHidden("hidden");
        }

        setDataVisible(!dataVisible);

        const newStudent = {
            first_name: inputRef.current.value,
            last_name: null,
            password: null,
        };
        console.log(newStudent);
        console.log("studentIdAtom", studentIdAtom);
        postStudent(newStudent).then((result) => {
            console.log("result", result);
        });
    }

    return (
        <>
            <Nav />
            <div className="checkbox-collects ">
                <fieldset>
                    <legend>
                        <h2>Search Form</h2>
                    </legend>

                    <div id="username2">
                        <p>Name:</p>
                        <input
                            id="username"
                            name="name"
                            type="text"
                            ref={inputRef}
                        />
                        <p></p>
                    </div>

                    <div id="searchFor2">
                        <p>Search For:</p>
                        <input
                            id="searchFor"
                            name="search"
                            type="text"
                            placeholder="Enter Search terms.."
                            value={searchingValue}
                            onChange={(e) => {
                                setSearchingValue(e.target.value);
                            }}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    search();
                                }
                            }}
                        />
                        <p></p>
                    </div>

                    <button
                        id="random"
                        onClick={() => {
                            search();
                            search2();
                        }}
                        data-visible={dataVisible}
                    >
                        {changingText}
                    </button>
                </fieldset>

                <fieldset>
                    <div id="innerBorder" styles={{ display: "none" }}>
                        <div id="courseList"></div>
                        <h>{text}</h>
                        {isOpen && <CourseCheckboxList current showDetail />}
                        <button
                            id="setCourses"
                            onClick={register}
                            hidden={registerHidden}
                        >
                            Register
                        </button>
                    </div>
                </fieldset>
            </div>
        </>
    );
}
