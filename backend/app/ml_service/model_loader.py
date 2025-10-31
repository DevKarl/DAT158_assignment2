import torch
import os
from torchvision import models
from dotenv import load_dotenv

load_dotenv()
MODEL_PATH = os.getenv("MODEL_PATH")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"MODEL_PATH not found: {MODEL_PATH}")

class ModelLoader:
    @staticmethod
    def load_model():
        # ResNet18
        model = models.resnet18()
        
        # matching our trained model..
        num_classes = 38  # tilsvarer datasettet samme antall classes 
        model.fc = torch.nn.Linear(model.fc.in_features, num_classes)

        # weights
        model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
        model.eval()
        return model