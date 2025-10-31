# 🌿 Plant Health Diagnoser

This is a full-stack web application that allows users to take a photo of common plants and receive a health diagnosis. The frontend is built with React + TypeScript and uses the browser's camera API to capture images. The backend is powered by FastAPI and serves a machine learning model that analyzes the image and returns a textual diagnosis.

🌿 Supported Plant Types

Apple

Blueberry

Cherry (including sour cherry)

Corn (maize)

Grape

Orange

Peach

Pepper (bell)

Potato

Raspberry

Soybean

Squash

Strawberry

Tomato

---

## 🧱 Project Structure

```
.
├── backend/               # Python Backend with FastAPI, PyTorch and more
│   ├── main.py
│   └── app/
├── frontend/
│   └── plant-health-app/  # React app
│       ├── src/
│       └── public/
├── .gitignore
├── README.md
```

---

## 🚀 How to Run Locally

### 🧪 Backend

This guide helps you set up and run the backend locally using Python. Works on macOS, Linux, and Windows.

## 🚀 How to Run Locally

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

- The frontend uses the browser’s camera to capture a photo of a plant.
- The photo is sent to the backend via a `POST /diagnose` request.
- The backend runs ML inference and returns a diagnosis like `"Healthy"` or `"Needs water"`.
- The frontend displays the result to the user.

---

## 🧠 Notes

- Make sure your browser allows camera access.
- The backend must be running before you run the frontend.

---
