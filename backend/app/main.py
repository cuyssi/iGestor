from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserSchema
from app.schemas import TurnCreate
from app.models import Turn
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import UserLogin
from jose import jwt, JWTError
from app.security import (
    verify_password,
    create_access_token,
    get_password_hash,
    get_current_user,
    create_refresh_token,
    SECRET_KEY,
    ALGORITHM,
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

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@app.post("/refresh")
def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token inválido")

        new_access_token = create_access_token({"sub": email})
        return {"access_token": new_access_token}
    except JWTError:
        raise HTTPException(status_code=401, detail="Refresh token inválido o expirado")


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


@app.post("/turns")
def create_turn(
    turn: TurnCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_turn = Turn(
        date=turn.date,
        start_time=turn.start_time or "",
        end_time=turn.end_time or "",
        shift=turn.shift,
        days=turn.days,
        morning_start_time=turn.morning_start_time,
        morning_end_time=turn.morning_end_time,
        afternoon_start_time=turn.afternoon_start_time,
        afternoon_end_time=turn.afternoon_end_time,
        user_id=current_user.id,
    )
    db.add(new_turn)
    db.commit()
    db.refresh(new_turn)
    return {"message": "Turno guardado", "turn": new_turn}


@app.get("/turns")
def get_turns(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    return db.query(Turn).filter(Turn.user_id == current_user.id).all()
