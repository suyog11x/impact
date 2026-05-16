"""
SkillSync AI — FastAPI Backend
Handles resume extraction and AI processing endpoints.
"""

import io
import os

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load .env from the backend directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

# PDF and DOCX text extraction
from pdfminer.high_level import extract_text as extract_pdf_text
from docx import Document as DocxDocument

from resumeextractor import ats_extractor

import uvicorn

app = FastAPI(title="SkillSync AI Backend API")

# Allow both Vite dev ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ──────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────

def extract_text_from_pdf(file_bytes: bytes) -> str:
    return extract_pdf_text(io.BytesIO(file_bytes))


def extract_text_from_docx(file_bytes: bytes) -> str:
    doc = DocxDocument(io.BytesIO(file_bytes))
    return "\n".join([para.text for para in doc.paragraphs])


# ──────────────────────────────────────────────
# Routes
# ──────────────────────────────────────────────

@app.get("/")
def read_root():
    return {"status": "healthy", "service": "SkillSync AI Engine"}


@app.post("/api/ai/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    """
    Accepts a PDF or DOCX resume, extracts text, and returns
    structured information via Gemini.
    """
    filename = file.filename or ""
    file_bytes = await file.read()

    # Validate file type
    if filename.lower().endswith(".pdf"):
        try:
            resume_text = extract_text_from_pdf(file_bytes)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to read PDF: {e}")
    elif filename.lower().endswith((".docx", ".doc")):
        try:
            resume_text = extract_text_from_docx(file_bytes)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to read DOCX: {e}")
    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Please upload a PDF or DOCX file.",
        )

    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Could not extract any text from the file.")

    # Call Gemini extractor
    try:
        extracted = ats_extractor(resume_text)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI extraction failed: {e}")

    return {
        "filename": filename,
        "status": "success",
        "data": extracted,
    }


# ──────────────────────────────────────────────
# Placement Prediction (placeholder)
# ──────────────────────────────────────────────

class PredictionRequest(BaseModel):
    skills: list[str]
    experience: int
    target_role: str


@app.post("/api/ai/predict-placement")
def predict_placement(req: PredictionRequest):
    return {
        "success_probability": 0.85,
        "recommended_improvements": [
            "Add more cloud computing projects",
            "Improve system design skills",
        ],
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
