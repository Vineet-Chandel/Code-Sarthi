export default {
  topics: [
    {
      id: "routes",
      title: "Routes & Path Params",
      sections: [
        {
          heading: "Basic routes",
          description: "FastAPI uses Python type hints for validation and automatic OpenAPI docs generation.",
          language: "python",
          code: `from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello, FastAPI"}

@app.get("/users/{user_id}")
def get_user(user_id: int):      # auto-validates int
    return {"user_id": user_id}

@app.get("/search")
def search(q: str, page: int = 1, limit: int = 20):  # query params
    return {"q": q, "page": page, "limit": limit}`,
        },
        {
          heading: "HTTP methods",
          description: "Decorator determines the HTTP verb. Same path can have multiple verbs.",
          language: "python",
          code: `@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

@app.post("/items", status_code=201)
def create_item(item: ItemCreate):
    return {"id": 1, **item.dict()}

@app.put("/items/{item_id}")
def update_item(item_id: int, item: ItemUpdate):
    return {"item_id": item_id, **item.dict()}

@app.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int):
    return None`,
        },
        {
          heading: "Response models",
          description: "response_model filters the output to only include declared fields — hides sensitive data.",
          language: "python",
          code: `from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str

@app.post("/users", response_model=UserOut, status_code=201)
def create_user(user: UserCreate):
    # password is NOT included in the response
    return {"id": 42, "email": user.email}`,
        },
      ],
    },
    {
      id: "pydantic",
      title: "Pydantic Models",
      sections: [
        {
          heading: "Request body models",
          description: "Pydantic validates incoming JSON and coerces types automatically.",
          language: "python",
          code: `from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime

class PostCreate(BaseModel):
    title:        str          = Field(..., min_length=3, max_length=200)
    body:         str
    author_email: EmailStr
    tags:         list[str]    = []
    published:    bool         = False

class PostUpdate(BaseModel):
    title:     Optional[str]  = None
    body:      Optional[str]  = None
    published: Optional[bool] = None`,
        },
        {
          heading: "Nested models & validators",
          description: "Pydantic models can reference other models and add custom validation logic.",
          language: "python",
          code: `from pydantic import BaseModel, field_validator

class Address(BaseModel):
    street: str
    city:   str
    zip:    str

class User(BaseModel):
    name:    str
    email:   str
    address: Address  # nested model

    @field_validator("email")
    @classmethod
    def email_must_be_lowercase(cls, v: str) -> str:
        return v.lower()

# FastAPI auto-parses nested JSON into this shape
user = User(name="Vineet", email="V@B.COM",
            address={"street": "1 Main St", "city": "Mumbai", "zip": "400001"})`,
        },
      ],
    },
    {
      id: "async",
      title: "Async & Dependencies",
      sections: [
        {
          heading: "Async route handlers",
          description: "Use async def for I/O-bound routes (DB, HTTP) — FastAPI handles the event loop.",
          language: "python",
          code: `import httpx

@app.get("/github/{username}")
async def github_profile(username: str):
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"https://api.github.com/users/{username}")
        resp.raise_for_status()
        return resp.json()`,
        },
        {
          heading: "Dependency injection",
          description: "Depends() injects reusable logic (DB sessions, auth checks) into route handlers.",
          language: "python",
          code: `from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Header(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.token == token).first()
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return user

@app.get("/me")
def profile(user: User = Depends(get_current_user)):
    return user`,
        },
        {
          heading: "HTTPException & custom errors",
          description: "Raise HTTPException to return structured error responses from any route.",
          language: "python",
          code: `from fastapi import HTTPException

@app.get("/items/{item_id}")
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Custom exception handler
from fastapi.responses import JSONResponse
from fastapi.requests import Request

@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    return JSONResponse(status_code=422, content={"detail": str(exc)})`,
        },
      ],
    },
    {
      id: "middleware",
      title: "Middleware & CORS",
      sections: [
        {
          heading: "CORS middleware",
          description: "Add CORSMiddleware to allow cross-origin requests from your frontend.",
          language: "python",
          code: `from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://myapp.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`,
        },
        {
          heading: "Custom middleware",
          description: "Middleware wraps every request — useful for logging, timing, and auth headers.",
          language: "python",
          code: `import time
from fastapi import Request

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    duration = time.perf_counter() - start
    response.headers["X-Process-Time"] = f"{duration:.4f}s"
    return response`,
        },
      ],
    },
  ],
};
