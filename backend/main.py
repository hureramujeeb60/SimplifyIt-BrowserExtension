from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for testing)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class SimplifyRequest(BaseModel):
    text: str
    level: str = "basic"  # Default to "basic" complexity

@app.post("/simplify")
def simplify_text(request: SimplifyRequest):
    api_key = os.getenv("TOGETHER_API_KEY")  # Use Together API key
    if not api_key:
        raise HTTPException(status_code=500, detail="API key missing")
    
    prompt = f"Simplify this text to a {request.level} reading level, suitable for a 10-year-old. Keep technical terms if critical. Return only the simplified text without markdown:\n\n{request.text}"
    
    try:
        response = requests.post(
            "https://api.together.xyz/v1/chat/completions",  # Together AI endpoint
            headers={"Authorization": f"Bearer {api_key}"},
            json={
                "model": "meta-llama/Llama-3.3-70B-Instruct-Turbo",
                "messages": [{"role": "user", "content": prompt}]
            }
        )
        simplified_text = response.json()["choices"][0]["message"]["content"]
        return {"simplified_text": simplified_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"API error: {str(e)}")
