import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Home from "./Home";
import Instructions from "./Instructions";
import Previous from "./Previous";
import Select from "./Select";
import { courseListAtom, userAtom } from "../model/states";

const EmptyBody = () => {
    return <div></div>;
};

const defualtUserData = {
    id: "meme",
    name: "EW",
    registered: [],
    registering: [],
};

export default function RouterPage() {
    const [user, setUser] = useRecoilState(userAtom);
    const setCourseList = useSetRecoilState(courseListAtom);

    useEffect(() => {
        const saved1 = localStorage.getItem("user");
        if (saved1) {
            const parsed = JSON.parse(saved1);
            parsed.registering = [];
            setUser(parsed);
        }
        const saved2 = localStorage.getItem("courseList");
        if (saved2) {
            setCourseList(JSON.parse(saved2));
        }
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/instructions" element={<Instructions />} />
                    <Route path="/previous" exact element={<Previous />} />
                    <Route path="/select" exact element={<Select />} />
                </Routes>
            </Router>
        </>
    );
}
