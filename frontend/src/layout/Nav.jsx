import React, { useEffect, useRef } from "react";
import { get_courses } from "../../utils/api/api";
import { useCourseStore } from "../hooks/courseStore";
import { useSelectedCourseStore } from "../hooks/selectdCourseStore";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Nav = () => {
  gsap.registerPlugin(useGSAP);

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

  const container = useRef(null);

  const timeline = useRef(gsap.timeline({ paused: true }));

  useGSAP(
    () => {
      timeline.current.to(".side-bar", { opacity: 0 });
    },
    { scope: container }
  );

  const handleToggle = () => {
    if (timeline.current.paused()) {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  };

  return (
    <div className="side-bar">
      <div ref={container} className="hamburger" onClick={handleToggle}>
        <span></span>
        <span></span>
      </div>

      <div className="content2">
        <nav className="nav1">
          <ul>
            <h2>Navigation</h2>
            {Array.isArray(course) && course.length > 0 ? (
              course.map((item, i) => (
                <li onClick={() => handleClick(i)} key={item.id}>
                  <a href="#">{item.name}</a>
                </li>
              ))
            ) : (
              <li>
                <a href="">No courses available</a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
