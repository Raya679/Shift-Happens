import os
from fastapi import FastAPI
# from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
# from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from main import query_rag


class QueryRequest(BaseModel):
    query: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to the Neurobagel Query Tool AI API"}

@app.post("/answer_query/")
async def answer_query(request: QueryRequest):
    return query_rag(request.query)

if __name__ == "__main__":
    import uvicorn

    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))

    uvicorn.run(app, host=host, port=port)