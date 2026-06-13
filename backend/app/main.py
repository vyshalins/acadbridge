from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv

from app.routes import semester, resume, role_fit, roadmap

load_dotenv()

app = FastAPI(title="AcadBridge Backend", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTERS (PREFIX ONLY HERE)
app.include_router(semester.router, prefix="/api/semester", tags=["Semester Analysis"])
app.include_router(resume.router, prefix="/api/resume", tags=["Resume Generation"])
app.include_router(role_fit.router, prefix="/api/role-fit", tags=["Role Fit"])
app.include_router(roadmap.router, prefix="/api/roadmap", tags=["Roadmap"])

@app.get("/")
async def root():
    return {"message": "AcadBridge Backend Running"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
