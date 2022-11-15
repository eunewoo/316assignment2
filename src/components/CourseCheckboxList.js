/*bundle of CourseCheckBox*/
import React, { useEffect, useState } from "react";
import { atom } from "recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    courseListAtom,
    searchQueryAtom,
    userAtom,
    getCourseList,
    getPrereqList,
    studentIdAtom,
} from "../model/states";
import CourseCheckbox from "./CourseCheckbox";

const CourseCheckboxList = ({ showDetail, current }) => {
    const [user, setUser] = useRecoilState(userAtom);
    const [courseList, setCourseList] = useRecoilState(courseListAtom);
    const searchQuery = useRecoilValue(searchQueryAtom);
    const studentId = useRecoilValue(studentIdAtom);

    useEffect(() => {
        const resultCourseList = [];
        //covert db course form into original course type
        getCourseList().then((list) => {
            // setCourseList([list]);
            const dbCourseList = list;

            for (let i = 0; i < dbCourseList.length; i++) {
                const dbCourse = dbCourseList[i];
                const UpdateCourse = {
                    id: dbCourse.course_id,
                    label: dbCourse.course_id,
                    prerequistes: [],
                    description: dbCourse.course_name,
                    seatsRemaining: dbCourse.course_seatsremaining,
                    capacity: dbCourse.course_capacity,
                };

                resultCourseList.push(UpdateCourse);
            }
            getPrereqList().then((list2) => {
                // setCourseList([list]);
                const dbPrereqList = list2;
                for (let i = 0; i < dbPrereqList.length; i++) {
                    const dbPrereq = dbPrereqList[i];
                    const dbPrereq_head_id = dbPrereq.course_rec_id;

                    const dbPrereq_tail =
                        resultCourseList[dbPrereq.course_prereq_rec_id - 1].id;

                    resultCourseList[dbPrereq_head_id - 1].prerequistes.push(
                        dbPrereq_tail
                    );
                }
            });
            console.log("resultCourseList1", resultCourseList);

            if (studentId != -1) {
                setCourseList(() => resultCourseList);
            } else {
                setCourseList(() => []);
            }
        });
        //convert db prereq form(a,b) into original prereq type(array)

        console.log("resultCourseList2", resultCourseList);
        // setCourseList(resultCourseList);
        // console.log("courselist", courseList);
        //setCourseList(() => resultCourseList);
    }, []);

    const handleCheckboxChange = (id) => {
        if (current) {
            // when check and registere at select
            const newCourseList = [...courseList];
            const newRegiList = [...user.registering];

            for (let i = 0; i < newCourseList.length; i++) {
                if (newCourseList[i].id === id) {
                    const newCourseData = { ...newCourseList[i] };
                    if (user.registering.includes(id)) {
                        //course
                        newCourseData.seatsRemaining++;
                        newCourseList[i] = newCourseData;
                        setCourseList(() => newCourseList);
                        // user
                        for (let k = 0; newRegiList.length; k++) {
                            if (newRegiList[k] === id) {
                                newRegiList.splice(k, 1);
                                break;
                            }
                        }
                        const newUser = {
                            ...user,
                            registering: newRegiList,
                        };
                        setUser(() => newUser); // set userdata
                    } else {
                        // course
                        newCourseData.seatsRemaining--;
                        newCourseList[i] = newCourseData;
                        setCourseList(() => newCourseList);
                        // user
                        newRegiList.push(id);
                        const newUser = { ...user, registering: newRegiList };
                        setUser(() => newUser); // set userdata
                    }
                    return;
                }
            }
        } else {
            // when check previous
            const newRegiList = [...user.registered];

            for (let i = 0; i < newRegiList.length; i++) {
                // if there exists, remove
                if (id === newRegiList[i]) {
                    newRegiList.splice(i, 1);
                    const newUser = { ...user, registered: newRegiList };
                    setUser(() => newUser);
                    return;
                }
            }
            // if there doesn't exist, add
            newRegiList.push(id); // 없으면 추가
            const newUser = { ...user, registered: newRegiList };
            setUser(() => newUser);
        }
    };

    return (
        <div
            className={
                showDetail
                    ? "select-page-input-box-wrapper"
                    : "input-box-wrapper"
            }
        >
            {courseList
                .filter((course) => {
                    if (
                        !course.id.toLowerCase().includes(searchQuery) &
                        !course.description.toLowerCase().includes(searchQuery)
                    ) {
                        return;
                    } else {
                        return course;
                    }
                })
                .map((course) => {
                    // isRegistered or registering
                    const isDone = (regiList) => {
                        for (let i = 0; i < regiList.length; i++) {
                            if (regiList[i] === course.id) {
                                return true;
                            }
                        }
                        return false;
                    };
                    const { description, seatsRemaining, capacity } = course;

                    return (
                        <CourseCheckbox
                            key={"ccb-" + course.id}
                            id={course.id}
                            label={course.label}
                            value={course.value}
                            checked={
                                current
                                    ? isDone(user.registering)
                                    : isDone(user.registered)
                            }
                            // disabled={current ? isDone(user.registered) : false}
                            onChange={() => handleCheckboxChange(course.id)}
                            showDetail={showDetail}
                            details={{ description, seatsRemaining, capacity }}
                        />
                    );
                })}
        </div>
    );
};

export default CourseCheckboxList;
