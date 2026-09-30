from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.books import router as books_router

app = FastAPI(title="Library Catalog API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(books_router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}
