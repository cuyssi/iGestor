from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    turns = relationship("Turn", back_populates="user")

class Turn(Base):
    __tablename__ = "turns"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.utcnow)
    start_time = Column(String, nullable=False)
    end_time = Column(String, nullable=False)
    type = Column(String, default="normal")
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="turns")
