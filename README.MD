# 🌿 Plant Health Diagnosis App – DAT158 Assignment 2

A full-stack machine learning web application for diagnosing plant leaf diseases using image classification.  
Built with React, FastAPI, and PyTorch — trained on a Kaggle dataset.

Users can either capture a photo using their device’s camera or upload an existing image of a plant leaf.  
The frontend, built with React + TypeScript, handles image input and communicates with the backend via API requests.  
The backend, powered by FastAPI and PyTorch, runs a trained ResNet18 model to analyze the image and return a diagnosis including plant type, health status, and confidence score.

🌿 Supported Plant Types:

- Apple
- Blueberry
- Cherry (including sour cherry)
- Corn (maize)
- Grape
- Orange
- Peach
- Pepper (bell)
- Potato
- Raspberry
- Soybean
- Squash
- Strawberry
- Tomato

---

👉 [Link to YT demo video](https://www.youtube.com/watch?v=YCozlWj5nFc)

### 📁 Dataset Used

This project uses the [New Plant Diseases Dataset (Augmented)](https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset) from Kaggle.
The dataset contains labeled images of healthy and unhealhty leaves across various plant species.
It was used to train the classification model (`model.pt`) included in this project.

---

### 🧠 Model Training

The training script used to generate `model.pt` is included as `train_model.py`.
It was executed in Google Colab using PyTorch.
To retrain the model, simply upload the Kaggle dataset to your Google Drive and run the script in the notebook.
Training took approximately 40 minutes using the free T4 GPU runtime provided by Colab.

---

### 🔧 Model Hosting

The trained model (`model.pt`) is publicly hosted via GitHub Releases:
[Download model.pt](https://github.com/DevKarl/DAT158_assignment2/releases/download/v1.0/model.pt)

The backend automatically downloads and loads the model at runtime.
No manual setup or `.env` file is required.

## 🧱 Project Structure

```

.
├── backend/ # Python Backend with FastAPI, PyTorch and more
│ ├── main.py
│ └── app/
├── frontend/
│ └── plant-health-app/ # React app
│ ├── src/
│ └── public/
├── .gitignore
├── README.md

```

---

## 🚀 How to Run Locally

### 🧪 Backend

This guide helps you set up and run the backend locally using Python. Works on macOS, Linux, and Windows.

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Create a virtual environment (first time only)
python -m venv venv

# 3. Activate the virtual environment
# macOS/Linux:
source venv/bin/activate
# Windows CMD:
venv\Scripts\activate
# Windows PowerShell:
.\venv\Scripts\Activate.ps1

# 4. Install dependencies
pip install -r requirements.txt

# 5. Start the backend server
uvicorn main:app --reload
```

Once running, the backend will be available at:  
`http://localhost:8000`

---

### 🎨 Frontend Setup (React + TypeScript)

```bash
# 1. Navigate to the frontend folder
cd frontend/plant-health-frontend

# 2. Install dependencies (requires Node.js + npm)
npm install

# 3. Start the development server
npm run dev
```

Frontend will run at:  
`http://localhost:5173`

---

## 📸 How It Works

- Users can either **capture a photo using their camera** or **upload an image file** from their device.
- The image is sent to the backend via a `POST /diagnose` request.
- Optionally, users can preprocess the image using the `POST /normalizeBackground` endpoint to remove the background and improve model accuracy.
- The backend runs ML inference using the model and returns:
  - **Plant type** (e.g., `"Apple"`)
  - **Health status** (e.g., `"Black_rot"`)
  - **Confidence score** (e.g., `92.3%`)
- The frontend displays the diagnosis result to the user.

---

## 🧠 Notes

- Make sure your browser allows camera access if using the capture feature.
- The backend must be running and accessible before using the diagnosis or normalization features.
- Background normalization is optional but may improve prediction accuracy in some cases.
