from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.examgenerator import router as examgenerator_route

app = FastAPI()
'''
Access the API documentation at:

Swagger UI: http://127.0.0.1:8000/docs
Redoc UI: http://127.0.0.1:8000/redoc
'''

# Add CORS middleware
origins = [
  "http://localhost:3000", # React
  "http://localhost:5173", # Vite
  "https://yourfrontenddomain.com",  # Production frontend
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)





@app.get("/")
def read_root():
  return {"message": "Hello, World!"}
