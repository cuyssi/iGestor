from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserSchema
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import UserLogin
from app.security import (
    verify_password,
    create_access_token,
    get_password_hash,
    get_current_user,
)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "¡Backend funcionando!"}


@app.post("/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    print("Datos recibidos:", user_data)
    user = db.query(User).filter(User.email == user_data.email).first()

    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


@app.post("/users", response_model=UserSchema)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(user.password[:60])

    new_user = User(name=user.name, email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@app.get("/users", response_model=list[UserSchema])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()
