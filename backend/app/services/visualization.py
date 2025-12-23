from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt
import io, base64
import matplotlib
matplotlib.use("Agg")


def generate_confusion_matrix(y_true, y_pred):
    cm = confusion_matrix(y_true, y_pred)

    plt.figure(figsize=(5, 4))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")

    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    plt.close()

    return base64.b64encode(buf.getvalue()).decode()
