import torch
import torch.nn as nn
from torchvision import models, datasets, transforms
from torch.utils.data import DataLoader

# --- Device ---
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Using device:", device)

# --- Paths ---
VALID_DIR = "/content/plant_dataset/new plant diseases dataset(augmented)/New Plant Diseases Dataset(Augmented)/valid"
MODEL_PATH = "/content/drive/MyDrive/Colab Notebooks/model.pt"  # path to your saved model

# --- Transforms (same as training) ---
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5,0.5,0.5], std=[0.5,0.5,0.5])
])

# --- Load Validation Dataset ---
valid_dataset = datasets.ImageFolder(VALID_DIR, transform=transform)
valid_loader = DataLoader(valid_dataset, batch_size=32, shuffle=False)

print(f"Number of classes: {len(valid_dataset.classes)}")
print(f"Number of validation images: {len(valid_dataset)}")
print("Classes:", valid_dataset.classes[:10], "...")  # show first 10 classes

# --- Load Model ---
model = models.resnet18(pretrained=True)
model.fc = nn.Linear(model.fc.in_features, len(valid_dataset.classes))
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model = model.to(device)
model.eval()

# --- Evaluate on Validation Set ---
correct = 0
total = 0

with torch.no_grad():
    for images, labels in valid_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        _, predicted = torch.max(outputs, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

accuracy = 100 * correct / total
print(f"Overall accuracy: {accuracy:.2f}% (N={total})")

# RESULT: 97.26%