import torch

# TODO: Define label mapping (index to class name)
LABELS = {
    0: "Healthy",
    1: "Needs water",
    2: "Overwatered",
    # Add more as needed
}

def predict_label(model: torch.nn.Module, image_tensor: torch.Tensor) -> tuple[str, float]:
    # TODO: Run inference
    with torch.no_grad():
        outputs = model(image_tensor)
        probs = torch.softmax(outputs, dim=1)
        confidence, predicted_idx = torch.max(probs, dim=1)

    label = LABELS.get(predicted_idx.item(), "Unknown")
    return label, confidence.item()