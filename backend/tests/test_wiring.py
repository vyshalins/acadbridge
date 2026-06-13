from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import sys
import os

# Add the backend directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Set dummy API key for testing
os.environ["GROQ_API_KEY"] = "dummy_key"

from app.main import app

client = TestClient(app)

# Mock response data
MOCK_SEMESTER_RESPONSE = {
    "semester_detected": "Semester 5",
    "theory_subjects": [{"name": "Subject A", "topics": [{"name": "Topic 1", "industry_relevance": "High"}]}],
    "lab_subjects": [],
    "industry_skills": [{"name": "Skill A", "category": "Core", "status": "Learning"}],
    "industry_relevance": "High",
    "semester_readiness_score": 85,
    "summary_card_data": {"key": "value"}
}

MOCK_RESUME_RESPONSE = {
    "ats_optimized_resume_text": "Resume content...",
    "ats_match_percentage": 90,
    "missing_keywords": ["python"]
}

MOCK_ROLE_FIT_RESPONSE = {
    "role_fit_percentage": 90,
    "strengths": ["Skill A"],
    "missing_skills": ["Skill B"],
    "in_progress_skills": [],
    "skill_priority": ["Skill B"]
}

MOCK_ROADMAP_RESPONSE = {
    "roadmap": [
        {
            "month": 1,
            "focus_area": "Basics",
            "skills_to_learn": ["Skill A"],
            "project_idea": "Build X",
            "expected_outcome": "Understand X"
        }
    ]
}

@patch('app.services.semester_service.get_groq_response', return_value=MOCK_SEMESTER_RESPONSE)
def test_semester_analyze(mock_groq):
    response = client.post(
        "/api/semester/analyze",
        data={"syllabus_text": "Sample syllabus", "manual_semester": "Semester 5"}
    )
    assert response.status_code == 200
    assert response.json()["semester_detected"] == "Semester 5"

@patch('app.services.resume_service.get_groq_response', return_value=MOCK_RESUME_RESPONSE)
def test_resume_generate(mock_groq):
    response = client.post(
        "/api/resume/generate",
        json={
            "target_role": "Backend Dev",
            "tools": ["Python"],
            "achievements": ["Built API"]
        }
    )
    assert response.status_code == 200
    assert response.json()["ats_match_percentage"] == 90

@patch('app.services.role_fit_service.get_groq_response', return_value=MOCK_ROLE_FIT_RESPONSE)
def test_role_fit_analyze(mock_groq):
    response = client.post(
        "/api/role-fit/analyze",
        json={
            "target_role": "Backend Dev",
            "current_skills": ["Python"]
        }
    )
    assert response.status_code == 200
    assert response.json()["role_fit_percentage"] == 90

@patch('app.services.roadmap_service.get_groq_response', return_value=MOCK_ROADMAP_RESPONSE)
def test_roadmap_generate(mock_groq):
    response = client.post(
        "/api/roadmap/generate",
        json={
            "target_role": "Backend Dev",
            "experience_level": "Beginner"
        }
    )
    assert response.status_code == 200
    assert len(response.json()["roadmap"]) == 1

if __name__ == "__main__":
    try:
        test_semester_analyze()
        print("Semester Analyze Test: PASSED")
        test_resume_generate()
        print("Resume Generate Test: PASSED")
        test_role_fit_analyze()
        print("Role Fit Analyze Test: PASSED")
        test_roadmap_generate()
        print("Roadmap Generate Test: PASSED")
    except Exception as e:
        print(f"Tests FAILED: {e}")
        import traceback
        traceback.print_exc()
