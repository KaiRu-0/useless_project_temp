import os.path
import requests

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.me",
    "https://www.googleapis.com/auth/classroom.coursework.students",
    "https://www.googleapis.com/auth/drive.readonly",
]


def get_downloadable_url(view_url: str) -> str:
    try:
        # Extract the file ID from the view URL
        file_id = view_url.split("/d/")[1].split("/view")[0]
        # Construct the downloadable URL
        download_url = f"https://drive.google.com/uc?export=download&id={file_id}"
        return download_url
    except IndexError:
        return "Invalid URL format"


def get_cred():
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    return creds


def token_init():
    get_cred()


def get_courses():
    try:
        creds = get_cred()
        service = build("classroom", "v1", credentials=creds)
        results = service.courses().list(pageSize=10).execute()
        courses = results.get("courses", [])
        return courses
    except HttpError as error:
        print(f"An error occurred: {error}")


def get_assignments(course_id):
    try:
        creds = get_cred()
        service = build("classroom", "v1", credentials=creds)
        results = service.courses().courseWork().list(courseId=course_id).execute()
        assignments = results.get("courseWork", [])
        return assignments
    except HttpError as error:
        print(f"An error occurred: {error}")


def download_pdf(url):
    """
    Download a PDF file from a URL and save it locally.

    :param url: The URL of the PDF file.
    :param save_path: The local path where the PDF file will be saved.
    """
    new_url = get_downloadable_url(url)
    try:
        response = requests.get(new_url)
        response.raise_for_status()  # Check if the request was successful

        with open("./downloads", "wb") as file:
            file.write(response.content)

        print("PDF downloaded and saved to ./downloads")
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
