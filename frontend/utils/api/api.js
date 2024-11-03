import axios from "axios";

// const url = import.meta.env.VITE_API_URL;
export const get_courses = async () => {
    const response = await axios.get("http://127.0.0.1:8000/get_courses");
    const data = await response.data;
    return data;
}