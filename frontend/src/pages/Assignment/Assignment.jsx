import React, { useEffect, useState } from "react";
import "./ass.scss";
import Nav2 from "../../layout/Nav2";
import { useAssignmentStore } from "../../hooks/assignmentStore";
import { get_normal_ans } from "../../../utils/api/api";
import ReactMarkdown from "react-markdown";
const Assignment = () => {
  const [isLoading, setisLoading] = useState(true);
  const { ass } = useAssignmentStore();
  const [answer, setanswer] = useState(null);

  async function get_answer() {
    const ans = await get_normal_ans(ass.title);
    console.log(ans);
    setanswer(ans);
  }

  useEffect(() => {
    console.log("wyeye");
    get_answer();
  }, [ass]);

  return (
    <>
      <div className="container-ass">
        <Nav2 />
        <div className="content-wrapper">
          <div className="question">
            <h3>{ass.title}</h3>
            <p>{ass.description}</p>
          </div>
          <div
            style={{
              marginTop: "3rem",
            }}
          >
            {answer && (
              <div style={{}}>
                <ReactMarkdown>{answer.answer.text}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Assignment;
