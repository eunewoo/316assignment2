//this file changed from storing courseList data to call data from db
import { atom } from "recoil";

export const studentIdAtom = atom({
    key: "studentId",
    default: -1,
});

export const studentPwAtom = atom({
    key: "studentPw",
    default: 0,
});

export const userAtom = atom({
    key: "user",
    default: {
        id: "1",
        name: "",
        registered: [],
        registering: [],
    },
});

const defaultHeaders = {
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    },
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error: ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

export const getCourseList = () => {
    return fetch("/api/courseman/getCourses", {
        ...defaultHeaders,
    })
        .then(checkStatus)
        .then(parseJSON);
};

export const getPrereqList = () => {
    return fetch("/api/courseman/prereqs", {
        ...defaultHeaders,
    })
        .then(checkStatus)
        .then(parseJSON);
};

export const getStudentList = (inputId) => {
    return fetch(`/api/courseman/students/${inputId}`, {
        ...defaultHeaders,
        //method: "GET",
        //body: JSON.stringify(inputId),
    })
        .then(checkStatus)
        .then(parseJSON);
};

export const postStudent = (student) => {
    console.log("student", student);
    return fetch("/api/student", {
        ...defaultHeaders,
        method: "POST",
        body: JSON.stringify(student),
    })
        .then(checkStatus)
        .then(parseJSON);
};

export const postTranscript = (transcript) => {
    console.log("transcript", transcript);
    return fetch("/api/transcript", {
        ...defaultHeaders,
        method: "POST",
        body: JSON.stringify(transcript),
    })
        .then(checkStatus)
        .then(parseJSON);
};

export const courseListAtom = atom({
    key: "courseList",
    default: [
        // {
        //     id: "CSE101",
        //     label: "CSE101",
        //     prerequistes: [],
        //     description: "Algorithmic Thinking",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE114",
        //     label: "CSE114",
        //     prerequistes: [],
        //     description: "Introduction to Object Oriented Programming",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE214",
        //     label: "CSE214",
        //     prerequistes: ["CSE114"],
        //     description: "Data Structures",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE215",
        //     label: "CSE215",
        //     prerequistes: [],
        //     description: "Foundations of Computer Science",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE216",
        //     label: "CSE216",
        //     prerequistes: ["CSE214"],
        //     description: "Programing Abstractions",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE220",
        //     label: "CSE220",
        //     prerequistes: ["CSE214"],
        //     description: "System Fundamentals I",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE303",
        //     label: "CSE303",
        //     prerequistes: ["CSE214", "CSE215"],
        //     description: "Introduction to the Theory of Computation",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE304",
        //     label: "CSE304",
        //     prerequistes: ["CSE216", "CSE220"],
        //     description: "Compiler Design",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE305",
        //     label: "CSE305",
        //     prerequistes: ["CSE216"],
        //     description: "Database Systems",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE306",
        //     label: "CSE306",
        //     prerequistes: ["CSE216", "CSE320"],
        //     description: "Operating Systems",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE310",
        //     label: "CSE310",
        //     prerequistes: ["CSE306"],
        //     description: "Computer Networks",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE316",
        //     label: "CSE316",
        //     prerequistes: ["CSE216"],
        //     description: "Software Development",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE320",
        //     label: "CSE320",
        //     prerequistes: ["CSE220"],
        //     description: "System Fundamentals II",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE331",
        //     label: "CSE331",
        //     prerequistes: [],
        //     description: "Computer Security Basics",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
        // {
        //     id: "CSE416",
        //     label: "CSE416",
        //     prerequistes: ["CSE316"],
        //     description: "Software Engineering",
        //     seatsRemaining: 40,
        //     capacity: 40,
        // },
    ],
});

export const searchQueryAtom = atom({
    default: "",
    key: "searchQuery",
});
