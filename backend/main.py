import uvicorn
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from io import BytesIO

app = FastAPI()

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

    # MARKUS og ANWAR 
    # Kjør servicen for ML på data her..
    

    # Return dummy diagnosis
    return JSONResponse(content={"diagnosis": "test response string data"})


# For testing if photo in BE memory OK/NOT OK
@app.get("/photo")
def get_latest_photo():
    if latest_photo is None:
        return JSONResponse(content={"error": "No photo uploaded yet"}, status_code=404)

    latest_photo.seek(0)  # Reset pointer before streaming
    return StreamingResponse(latest_photo, media_type="image/jpeg")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
