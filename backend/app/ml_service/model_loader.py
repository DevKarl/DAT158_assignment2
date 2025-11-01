import os
import torch
import requests
from torchvision import models

MODEL_URL = os.getenv("MODEL_URL")

class ModelLoader:
    @staticmethod
    def load_model():
        print(f"🔄 Downloading model from {MODEL_URL}...")
        response = requests.get(MODEL_URL)
        model_bytes = response.content

        model = models.resnet18()
        num_classes = 38  # matches the Kaggle dataset
        model.fc = torch.nn.Linear(model.fc.in_features, num_classes)

        # Load weights from bytes
        from io import BytesIO
        buffer = BytesIO(model_bytes)
        model.load_state_dict(torch.load(buffer, map_location="cpu"))

        model.eval()
        print("✅ Model loaded from remote URL.")
        return model
