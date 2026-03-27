from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    wallet_address = Column(String, unique=True, index=True)
    verification_hash = Column(String, unique=True, index=True)
    ipfs_cid = Column(String)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    access_logs = relationship("AccessLog", back_populates="user")

class AccessLog(Base):
    __tablename__ = "access_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    institution_name = Column(String)
    access_type = Column(String)
    request_date = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String)
    user = relationship("User", back_populates="access_logs")