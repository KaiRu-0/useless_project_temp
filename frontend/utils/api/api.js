import axios from "axios";

// const url = import.meta.env.VITE_API_URL;
export const get_courses = async () => {
    const response = await axios.get("http://127.0.0.1:8000/get_courses");
    const data = await response.data;
    return data;
}

export const get_assignments = async (parms) => {
    console.log("params",parms);
    const response = await axios.post("http://127.0.0.1:8000/get_assignments_list",{
        "course_id": parms
    });
    const data = await response.data;
    return data.assignments;
}

export const get_normal_ans = async(title)=>{
    const response = await axios.post("http://127.0.0.1:8000/gen_answer",{"question":title});
    const data = await response.data;
    return data
}