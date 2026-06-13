from typing import List
from app.core.groq_client import get_groq_response
from app.schemas.responses import RoleFitResponse

async def analyze_role_fit(
    target_role: str,
    current_skills: List[str]
) -> RoleFitResponse:

    prompt = f"""
You are a career guidance expert.

Target Role:
{target_role}

User's CURRENT skills (treat these as STRONG / KNOWN skills, not in-progress):
{", ".join(current_skills)}

TASKS:
1. Calculate Role Fit Percentage (0–100).
2. Mark the user's provided skills ONLY as strengths.
3. Identify missing skills required for the target role.
4. Identify in-progress skills ONLY if they are closely related but not explicitly listed.
5. Create a DETAILED learning plan:
   - For each missing skill, list the MOST IMPORTANT industry-relevant topics.
   - Keep topics beginner-to-intermediate.
   - Limit to 3–5 topics per skill.

OUTPUT RULES:
- Strict JSON only
- No explanations
- No markdown

OUTPUT STRUCTURE:
{{
  "role_fit_percentage": int,
  "strengths": ["string"],
  "missing_skills": ["string"],
  "in_progress_skills": ["string"],
  "learning_plan": [
    {{
      "skill": "string",
      "topics": ["string"]
    }}
  ]
}}
"""

    response_data = get_groq_response(prompt)

    # 🛡️ SAFETY NORMALIZATION (CRITICAL)
    response_data.setdefault("role_fit_percentage", 0)
    response_data.setdefault("strengths", [])
    response_data.setdefault("missing_skills", [])
    response_data.setdefault("in_progress_skills", [])
    response_data.setdefault("learning_plan", [])

    # Ensure correct types (extra safety)
    if not isinstance(response_data["learning_plan"], list):
        response_data["learning_plan"] = []

    return RoleFitResponse(**response_data)
