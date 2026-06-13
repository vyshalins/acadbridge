import os
import json
from typing import Dict, Any, Optional
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is not set")

client = Groq(api_key=GROQ_API_KEY)

def get_groq_response(prompt: str, model: str = "llama-3.1-8b-instant") -> Dict[str, Any]:
    """
    Sends a prompt to Groq and returns the parsed JSON response.
    Enforces JSON format and deterministic output.
    """
    try:
        completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that outputs only valid JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model=model,
            temperature=0,
            response_format={"type": "json_object"},
        )
        
        response_content = completion.choices[0].message.content
        if not response_content:
            raise ValueError("Empty response from Groq")
            
        return json.loads(response_content)
        
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        # In a production app, you might want to retry or return a specific error structure
        raise ValueError(f"Failed to parse JSON response from Groq: {e}")
    except Exception as e:
        print(f"Groq API Error: {e}")
        raise e
