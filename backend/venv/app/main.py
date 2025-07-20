from fastapi import FastAPI # type: ignore
from app.routes import interview # type: ignore

app = FastAPI()

app.include_router(interview.router)

@app.get("/")
def root():
    return {"message": "AI Backend is running"}
