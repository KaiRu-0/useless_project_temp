from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from gen_ai import get_answer
from util_fun import get_assignments, token_init, get_courses, download_pdf
from models import CourseRequest, AssignmentRequest, Response_Request

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
def hello_world():
    return {"Hello": "World"}


@app.get("/register_user")
def register_user():
    try:
        token_init()
    except Exception as e:
        return {"message": str(e)}
    return {"message": "Register user"}


@app.get("/get_courses")
def get_enrolled_course():
    """
    return the list of courses the user is enrolled in
    """
    courses = get_courses()
    return {"courses": courses}


@app.post("/get_assignments_list")
def get_assignments_list(request: CourseRequest):
    """
    return the list of assignments in the course
    """
    assignments = get_assignments(request.course_id)
    return {"assignments": assignments}


@app.post("/get_assignment_answers")
def get_assignment_answers(request: AssignmentRequest):
    try:
        print("Downloading PDF", request.materials[0].driveFile.driveFile.alternateLink)
        download_pdf(request.materials[0].driveFile.driveFile.alternateLink)
        print("Downloaded PDF")
    except Exception as e:
        return {"message": str(e)}


@app.post("/gen_answer")
def gen_answer(request: Response_Request):
    print(request)
    answer = get_answer(request.question)
    return {"answer": answer}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
