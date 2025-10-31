from io import BytesIO
from PIL import Image

from app.ml_service.model_loader import ModelLoader
from app.ml_service.transforms import preprocess_image
from app.ml_service.predict import predict_label

class Diagnoser:
    def __init__(self):
        # load trained model 
        self.model = ModelLoader.load_model()

    def diagnose(self, image_bytes: BytesIO) -> str:
        
        # Convert img bytes to PIL.Image
        image = Image.open(image_bytes).convert("RGB")

        # Preprocess image for model input
        image_tensor = preprocess_image(image)

        # Run prediction and get label + confidence
        label, confidence = predict_label(self.model, image_tensor)

        # Return the diagnosis string
        return f"{label} ({confidence:.0%})"
