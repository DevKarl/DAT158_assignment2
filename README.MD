# 🌿 Plant Health Diagnoser

This is a full-stack web application that allows users to take a photo of a houseplant and receive a health diagnosis. The frontend is built with React + TypeScript and uses the browser's camera API to capture images. The backend is powered by FastAPI and serves a machine learning model that analyzes the image and returns a textual diagnosis.

---

## 🧱 Project Structure

```
.
├── backend/                  # Python Backend with FastAPI, PyTorch and more
│   ├── main.py
│   └── app/
├── frontend/
│   └── plant-health-frontend/  # React + Vite + TypeScript frontend
│       ├── src/
│       └── public/
├── .gitignore
├── README.md
```

---

## 🚀 How to Run Locally

### 🧪 Backend

1. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Start the backend server:

   ```bash
   uvicorn main:app --reload
   ```

4. The backend will run at:
   ```
   http://localhost:8000
   ```

---

### 🎨 Frontend

1. Navigate to the frontend folder:

   ```bash
   cd frontend/plant-health-frontend
   ```

2. Install dependencies(make sure node.js + npm is installed):

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The frontend will run at:
   ```
   http://localhost:5173
   ```

---

## 📸 How It Works

- The frontend uses the browser’s camera to capture a photo of a plant.
- The photo is sent to the backend via a `POST /diagnose` request.
- The backend runs ML inference and returns a diagnosis like `"Healthy"` or `"Needs water"`.
- The frontend displays the result to the user.

---

## 🧠 Notes

- Make sure your browser allows camera access.
- The backend must be running before you click “Diagnose” in the frontend.

---
