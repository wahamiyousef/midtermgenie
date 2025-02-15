import os
from fastapi import APIRouter, UploadFile, HTTPException
from fastapi.responses import FileResponse
from openai import OpenAI
from dotenv import load_dotenv
from fpdf import FPDF
import json

load_dotenv()

router = APIRouter()

client = OpenAI(
  base_url="https://api.studio.nebius.ai/v1/",
  api_key=os.environ.get("NEBIUS_API_KEY")
)

class PDF(FPDF):
  def write_with_formatting(self, text):
    """Custom method to handle basic formatting for exam questions."""
    lines = text.split("\n")
    for line in lines:
      if line.startswith("###"):  # Section headers
        self.set_font("Arial", "B", 14)
        self.cell(0, 10, line.strip("#").strip(), ln=True)
        self.ln(2)
      elif line.startswith("Q:"):
        self.set_font("Arial", "B", 12)
        self.multi_cell(0, 10, line)
        self.set_font("Arial", "", 12)
        self.ln(2)
      else:
        self.multi_cell(0, 10, line)
        self.ln(2)

@router.post("/generate_midterm")
async def generate_midterm(file: UploadFile):
  if not file.filename.endswith(".txt"):
    raise HTTPException(status_code=400, detail="Only .txt files are supported.")
  
  content = await file.read()
  extracted_text = content.decode("utf-8").strip()
  
  if not extracted_text:
    raise HTTPException(status_code=400, detail="The file is empty or contains invalid data.")
  
  midterm_text = generate_midterm_text(extracted_text)
  pdf_path = create_pdf_midterm(file.filename, midterm_text)
  
  return FileResponse(pdf_path, media_type='application/pdf', filename="generated_midterm.pdf")


def generate_midterm_text(content: str) -> str:
  """Generate a structured midterm exam based on a syllabus or previous midterm."""
  prompt = f"Generate a midterm exam based on the following syllabus or previous midterm:\n{content}\n\nInclude a variety of question types such as multiple choice, short answer, and essay questions."
  
  try:
    completion = client.chat.completions.create(
      model="meta-llama/Llama-3.3-70B-Instruct",
      messages=[
        {"role": "system", "content": "Generate a structured midterm exam with clear formatting."},
        {"role": "user", "content": prompt}
      ],
      temperature=0.7,
      max_tokens=1500,
      top_p=0.9
    )
    
    response = json.loads(completion.to_json())
    return response['choices'][0]['message']['content']
  except Exception as e:
    print(f"Error generating midterm text: {e}")
    raise HTTPException(status_code=500, detail="Error generating midterm text.")


def create_pdf_midterm(filename: str, midterm_text: str) -> str:
  """Generate a PDF midterm from structured text."""
  os.makedirs("midterms", exist_ok=True)
  pdf = PDF()
  pdf.add_page()
  pdf.set_font("Arial", size=12)
  pdf.write_with_formatting(midterm_text)
  pdf_path = f"midterms/{filename.replace('.txt', '.pdf')}"
  pdf.output(pdf_path)
  return pdf_path
