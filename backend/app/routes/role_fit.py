from fastapi import APIRouter, HTTPException
from app.schemas.responses import RoleFitRequest, RoleFitResponse
from app.services.role_fit_service import analyze_role_fit

router = APIRouter()

@router.post("/analyze", response_model=RoleFitResponse)
async def role_fit_endpoint(request: RoleFitRequest):
    try:
        fit_data = await analyze_role_fit(
            target_role=request.target_role,
            current_skills=request.current_skills
        )
        return fit_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
