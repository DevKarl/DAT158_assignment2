from app.ml_service.background_normalizer import BackgroundNormalizer
import uvicorn
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from io import BytesIO
from app.ml_service.diagnoser import Diagnoser

app = FastAPI()
diagnoser = Diagnoser()

# Allow frontend to access backend
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # Optional fallback
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for uploaded photo
latest_photo: BytesIO | None = None

@app.post("/diagnose")
async def diagnose(file: UploadFile = File(...)):
    global latest_photo
    # Read uploaded image into memory
    contents = await file.read()
    latest_photo = BytesIO(contents)
    result = diagnoser.diagnose(latest_photo) # ML SERVICE 
    return JSONResponse(content={"diagnosis": result})


@app.post("/normalizeBackground")
async def normalize_background(file: UploadFile = File(...)):
    contents = await file.read()
    image_bytes = BytesIO(contents)

    normalized_image = BackgroundNormalizer.normalize(image_bytes)

    output_bytes = BytesIO()
    normalized_image.save(output_bytes, format="JPEG")
    output_bytes.seek(0)

    return StreamingResponse(output_bytes, media_type="image/jpeg")



