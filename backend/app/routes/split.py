from fastapi import APIRouter, HTTPException
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from app.services.data_store import pipeline_store

router = APIRouter(prefix="/split", tags=["Train-Test Split"])


@router.post("/")
def split_data(ratio: float):
    # ---------- VALIDATION ----------
    if pipeline_store.raw_X is None or pipeline_store.y is None:
        raise HTTPException(
            status_code=400,
            detail="Dataset or preprocessing step missing."
        )

    if not (0 < ratio < 1):
        raise HTTPException(
            status_code=400,
            detail="Split ratio must be between 0 and 1."
        )

    # ---------- NaN CHECK (USER-FRIENDLY) ----------
    if pipeline_store.y.isna().any():
        nan_count = pipeline_store.y.isna().sum()
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Target column contains missing values",
                "nan_count": int(nan_count),
                "why": "Machine learning models cannot be trained with missing target labels.",
                "how_to_fix": [
                    "Remove rows with missing target values",
                    "Fill missing target values manually",
                    "Upload a cleaned dataset"
                ]
            }
        )

    if pipeline_store.y.nunique() < 2:
        raise HTTPException(
            status_code=400,
            detail="Target must contain at least two classes."
        )

    # ---------- SPLIT ----------
    X_train, X_test, y_train, y_test = train_test_split(
        pipeline_store.raw_X,
        pipeline_store.y,
        test_size=1 - ratio,
        random_state=42,
        stratify=pipeline_store.y
    )

    # ---------- APPLY SCALING (LEAKAGE-FREE) ----------
    scaler = None
    if pipeline_store.scaler_type == "standard":
        scaler = StandardScaler()
    elif pipeline_store.scaler_type == "minmax":
        scaler = MinMaxScaler()

    if scaler:
        X_train = scaler.fit_transform(X_train)
        X_test = scaler.transform(X_test)

    # ---------- SAVE PIPELINE STATE ----------
    pipeline_store.X_train = X_train
    pipeline_store.X_test = X_test
    pipeline_store.y_train = y_train
    pipeline_store.y_test = y_test

    # ---------- THIS IS WHERE YOUR CODE GOES ----------
    return {
        "status": "Dataset split successfully",
        "train_samples": len(X_train),
        "test_samples": len(X_test)
    }
