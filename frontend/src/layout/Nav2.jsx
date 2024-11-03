import React, { useEffect, useState } from "react";
import { get_assignments } from "../../utils/api/api";
import { useSelectedCourseStore } from "../hooks/selectdCourseStore";
import { useAssignmentStore } from "../hooks/assignmentStore";

const Nav2 = () => {
  const { course_id } = useSelectedCourseStore();
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      if (course_id) {
        try {
          console.log(course_id);
          const data = await get_assignments(course_id);
          console.log(data);
          setAssignments(data);
        } catch (err) {
          console.error("Failed to fetch assignments:", err);
          setError("Failed to fetch assignments");
        }
      }
    }
    getData();
  }, [course_id]);

  const { set_ass } = useAssignmentStore();

  return (
    <div className="side-bar">
      <label className="switch">
        <input type="checkbox" />
        <span className="wrapper">
          <span className="row">
            <span className="dot"></span>
            <span className="dot"></span>
          </span>
          <span className="row row-bottom">
            <span className="dot"></span>
            <span className="dot"></span>
          </span>
          <span className="row-vertical">
            <span className="dot"></span>
            <span className="dot middle-dot"></span>
            <span className="dot"></span>
          </span>
          <span className="row-horizontal">
            <span className="dot"></span>
            <span className="dot middle-dot-horizontal"></span>
            <span className="dot"></span>
          </span>
        </span>
      </label>
      <div className="content">
        <nav>
          <ul>
            <h2>Navigation</h2>
            {error ? (
              <li>{error}</li>
            ) : assignments.length > 0 ? (
              assignments.map((assignment) => (
                <li
                  key={assignment.id}
                  onClick={() => {
                    console.log("on", assignment);
                    set_ass(assignment);
                  }}
                >
                  <a href="#">{assignment.title}</a>
                </li>
              ))
            ) : (
              <li>No assignments available</li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav2;
