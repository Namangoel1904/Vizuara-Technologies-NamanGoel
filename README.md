# No-Code ML Pipeline Builder

This project is a web-based no-code machine learning pipeline builder.  
It allows users to upload a dataset, apply preprocessing, split data, train a model, and view results, without writing any code.

The goal is to simplify the end-to-end ML workflow into a clear, step-based experience.

---

## What the Application Does

The application guides the user through a fixed ML pipeline:

1. **Upload Dataset**
   - Supports CSV and Excel files
   - Displays dataset information (rows, columns, column names)

2. **Preprocessing**
   - Standardization (StandardScaler)
   - Normalization (MinMaxScaler)

3. **Train–Test Split**
   - User selects split ratio (70–30 or 80–20)
   - UI clearly shows train and test sample counts

4. **Model Training**
   - Logistic Regression
   - Decision Tree Classifier

5. **Results & Evaluation**
   - Model execution status
   - Accuracy score
   - Confusion matrix visualization

Each step is locked until the previous step is completed.

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Python
- pandas
- scikit-learn
- matplotlib, seaborn

---

## ML Pipeline Design Notes

- Scaling is applied **after** train–test split to avoid data leakage.
- The system does not silently modify user data.
- If the target column contains missing values, the pipeline stops and explains the issue.
- Evaluation includes a confusion matrix for better interpretability.

---

## Project Structure

```
no-code-ml-pipeline/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### Backend Setup

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at `http://127.0.0.1:8000`

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Recommended Dataset

Banknote Authentication Dataset (UCI):
https://archive.ics.uci.edu/ml/machine-learning-databases/00267/data_banknote_authentication.txt

Rename to `.csv` and add headers before uploading.

---

## Final Notes

This project focuses on correctness, clarity, and usability.  
It is designed as a foundation for a larger no-code ML platform.
