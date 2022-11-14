/*Each courses' checkbox*/
import React from "react";

const CourseCheckbox = ({
    id,
    value,
    label,
    onChange,
    checked,
    showDetail,
    details: { description, seatsRemaining, capacity },
}) => {
    return (
        <div className={showDetail ? "select-checkbox-con" : "checkbox-con"}>
            <input
                type="checkbox"
                value={value}
                checked={checked}
                className="checkbox"
                id={id}
                onChange={onChange}
            />
            <label htmlFor={id}>{id}</label>
            {showDetail && (
                <p>
                    : {description}-{seatsRemaining}
                    of
                    {capacity}
                </p>
            )}
        </div>
    );
};

export default CourseCheckbox;
