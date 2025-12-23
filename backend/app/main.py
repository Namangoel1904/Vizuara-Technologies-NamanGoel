from app.config import create_app
from app.routes import upload, preprocess, split, train

app = create_app()

app.include_router(upload.router)
app.include_router(preprocess.router)
app.include_router(split.router)
app.include_router(train.router)
