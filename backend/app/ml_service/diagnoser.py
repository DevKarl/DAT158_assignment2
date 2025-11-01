from io import BytesIO
from PIL import Image

from app.ml_service.model_loader import ModelLoader
from app.ml_service.transforms import preprocess_image
from app.ml_service.predict import predict_label

class Diagnoser:
    def __init__(self):
        self.model = ModelLoader.load_model()

    def diagnose(self, image_bytes: BytesIO) -> tuple[str, str, float]:
        image = Image.open(image_bytes).convert("RGB")
        image_tensor = preprocess_image(image)

        # Run prediction and get label + confidence
        label, confidence = predict_label(self.model, image_tensor)

        # Split label into plant + health status
        if "___" in label:
            plant, health_status = label.split("___", 1)
        else:
            plant = label
            health_status = "Healthy"

        return plant, health_status, confidence

