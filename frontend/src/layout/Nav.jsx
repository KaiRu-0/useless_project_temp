import React, { useEffect } from "react";
import { get_courses } from "../../utils/api/api";
import { useCourseStore } from "../hooks/courseStore";
import { useSelectedCourseStore } from "../hooks/selectdCourseStore";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { course, setCourse } = useCourseStore();
  const { setCourse_id } = useSelectedCourseStore();

  const navigate = useNavigate();

  const handleClick = (index) => {
    console.log("Clicked on course:", course[index]); // Log the clicked course
    setCourse_id(course[index].id);
    navigate(`/assignment/`); // Navigate to the course page
  };

  useEffect(() => {
    if (course.length === 0) {
      get_courses()
        .then((data) => {
          console.log("Fetched data:", data); // Log the fetched data
          if (Array.isArray(data.courses)) {
            setCourse(data.courses);
          } else {
            console.error("Fetched data is not an array:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        });
    }
  }, [course, setCourse]);

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
            {Array.isArray(course) && course.length > 0 ? (
              course.map((item, i) => (
                <li onClick={() => handleClick(i)} key={item.id}>
                  <a href="#">{item.name}</a>
                </li>
              ))
            ) : (
              <li>No courses available</li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
