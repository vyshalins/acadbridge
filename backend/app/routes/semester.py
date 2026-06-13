from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from app.services.semester_service import analyze_semester
from app.utils.syllabus_reader import read_syllabus
from app.schemas.responses import SemesterAnalysisResponse

router = APIRouter()

@router.post("/analyze", response_model=SemesterAnalysisResponse)
async def analyze_semester_endpoint(
    syllabus_text: Optional[str] = Form(None),
    syllabus_file: Optional[UploadFile] = File(None),
    manual_semester: Optional[str] = Form(None)
):
    try:
        # 1. Extract text
        text_content = await read_syllabus(file=syllabus_file, text=syllabus_text)
        
        if not text_content and not manual_semester:
            raise HTTPException(status_code=400, detail="Either syllabus text/file or manual semester is required")
            
        # 2. Call Service
        analysis = await analyze_semester(text_content, manual_semester)
        return analysis
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
