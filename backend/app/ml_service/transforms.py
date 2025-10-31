from torchvision import transforms
from PIL import Image
import torch

# TODO: Må matche med vår pipeline? 
transform_pipeline = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

def preprocess_image(image: Image.Image) -> torch.Tensor:
    # TODO: Apply transforms and add batch dimension
    tensor = transform_pipeline(image).unsqueeze(0)
    return tensor