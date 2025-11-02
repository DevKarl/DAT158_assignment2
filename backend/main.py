import os
from app.ml_service.background_normalizer import BackgroundNormalizer
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from io import BytesIO
from app.ml_service.diagnoser import Diagnoser
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
diagnoser = Diagnoser()

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

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
    contents = await file.read()
    latest_photo = BytesIO(contents)

    result = diagnoser.diagnose(latest_photo)  # returns raw model output

    label, health_status, confidence = result

    return JSONResponse(content={
        "diagnosis": {
            "label": label,
            "healthStatus": health_status,
            "confidence": round(confidence * 100, 2)  # percentage format
        }
    })


@app.post("/normalizeBackground")
async def normalize_background(file: UploadFile = File(...)):
    contents = await file.read()
    image_bytes = BytesIO(contents)

    normalized_image = BackgroundNormalizer.normalize(image_bytes)

    output_bytes = BytesIO()
    normalized_image.save(output_bytes, format="JPEG")
    output_bytes.seek(0)

    return StreamingResponse(output_bytes, media_type="image/jpeg")

