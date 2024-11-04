from pydantic import BaseModel
from typing import List, Optional, Union


class DriveFileDetails(BaseModel):
    id: str
    title: str
    alternateLink: str
    thumbnailUrl: Optional[str]


class DriveFile(BaseModel):
    driveFile: DriveFileDetails
    shareMode: str


class Material(BaseModel):
    driveFile: DriveFile


class AssignmentRequest(BaseModel):
    id: Union[str, int]
    title: str
    description: str
    materials: List[Material]


class CourseRequest(BaseModel):
    course_id: Union[str, int]


class Response_Request(BaseModel):
    question: str
