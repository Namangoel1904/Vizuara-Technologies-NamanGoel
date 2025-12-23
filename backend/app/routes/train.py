from fastapi import APIRouter, HTTPException
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from app.services.data_store import pipeline_store
from app.services.visualization import generate_confusion_matrix

router = APIRouter(prefix="/train", tags=["Model Training"])


@router.post("/")
def train_model(model: str):
    """
    Train a classification model on the prepared pipeline data.
    Assumes:
    - Dataset uploaded
    - Preprocessing method selected
    - Train-test split completed
    """

    # ---------- SAFETY CHECKS ----------
    if pipeline_store.X_train is None or pipeline_store.y_train is None:
        raise HTTPException(
            status_code=400,
            detail="Pipeline not ready. Ensure preprocessing and train-test split are completed."
        )

    # Ensure classification is possible
    unique_classes = pipeline_store.y_train.nunique()
    if unique_classes < 2:
        raise HTTPException(
            status_code=400,
            detail="Target column must contain at least two classes for classification."
        )

    # ---------- MODEL SELECTION ----------
    if model == "logistic":
        clf = LogisticRegression(
            max_iter=1000,
            solver="lbfgs"
        )
        model_name = "Logistic Regression"

    elif model == "tree":
        clf = DecisionTreeClassifier(
            random_state=42
        )
        model_name = "Decision Tree Classifier"

    else:
        raise HTTPException(
            status_code=400,
            detail="Invalid model type. Choose 'logistic' or 'tree'."
        )

    # ---------- TRAINING ----------
    clf.fit(pipeline_store.X_train, pipeline_store.y_train)

    # ---------- EVALUATION ----------
    predictions = clf.predict(pipeline_store.X_test)
    accuracy = accuracy_score(pipeline_store.y_test, predictions)

    # ---------- VISUALIZATION ----------
    confusion_matrix_plot = generate_confusion_matrix(
        pipeline_store.y_test,
        predictions
    )

    # Save model in pipeline state (optional but realistic)
    pipeline_store.model = clf

    # ---------- RESPONSE ----------
    return {
        "status": "Model trained successfully",
        "model": model_name,
        "accuracy": round(accuracy, 4),
        "evaluation": {
            "metric": "Accuracy",
            "value": round(accuracy, 4)
        },
        "visualization": {
            "type": "confusion_matrix",
            "image": confusion_matrix_plot
        }
    }
