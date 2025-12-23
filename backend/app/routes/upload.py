import pandas as pd
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.data_store import pipeline_store

router = APIRouter(prefix="/upload", tags=["Dataset Upload"])

@router.post("/")
async def upload_dataset(file: UploadFile = File(...)):
    if not file.filename.endswith((".csv", ".xlsx")):
        raise HTTPException(status_code=400, detail="Unsupported file format")

    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file.file)
        else:
            df = pd.read_excel(file.file)
    except Exception:
        raise HTTPException(status_code=400, detail="Failed to read file")

    pipeline_store.reset()
    pipeline_store.df = df

    return {
        "rows": df.shape[0],
        "columns": df.shape[1],
        "column_names": list(df.columns)
    }
