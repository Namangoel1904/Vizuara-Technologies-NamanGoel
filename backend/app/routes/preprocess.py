from fastapi import APIRouter, HTTPException
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from app.services.data_store import pipeline_store

router = APIRouter(prefix="/preprocess", tags=["Preprocessing"])

@router.post("/")
def preprocess(method: str):
    df = pipeline_store.df

    if df is None:
        raise HTTPException(status_code=400, detail="Dataset not uploaded")

    # Assume last column is target BUT validate
    y = df.iloc[:, -1]
    X = df.iloc[:, :-1]

    if y.nunique() < 2:
        raise HTTPException(
            status_code=400,
            detail="Target column must have at least 2 classes"
        )

    pipeline_store.raw_X = X
    pipeline_store.y = y

    pipeline_store.scaler_type = method

    return {"status": "Preprocessing method selected"}
