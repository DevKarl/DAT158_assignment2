from rembg import remove
from PIL import Image
from io import BytesIO

class BackgroundNormalizer:
    GRAY_RGB = (163, 161, 151)

    @staticmethod
    def normalize(image_bytes: BytesIO) -> Image.Image:
        # Load and convert to RGBA
        image = Image.open(image_bytes).convert("RGBA")

        # Remove background
        image = remove(image)

        # Create gray background
        gray_bg = Image.new("RGB", image.size, BackgroundNormalizer.GRAY_RGB)

        # Paste leaf onto gray background using alpha mask
        gray_bg.paste(image, mask=image.split()[-1])

        return gray_bg.convert("RGB")
