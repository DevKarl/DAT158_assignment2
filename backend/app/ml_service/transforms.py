from torchvision import transforms
from PIL import Image
import torch

transform_pipeline = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5],
                     std=[0.5, 0.5, 0.5])
])

def preprocess_image(image: Image.Image) -> torch.Tensor:
    tensor = transform_pipeline(image).unsqueeze(0)
    return tensor