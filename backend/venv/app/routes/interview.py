from fastapi import APIRouter # type: ignore

router = APIRouter(prefix="/interview", tags=["Interview"])

@router.get("/start")
def start_interview():
    return {"message": "Interview session started!"}
