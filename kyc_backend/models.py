from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    wallet_address = Column(String, unique=True, index=True)
    verification_hash = Column(String, unique=True, index=True, nullable=True)
    ipfs_cid = Column(String, nullable=True) 
    status = Column(String, default="Pending") 
    
    access_logs = relationship("AccessLog", back_populates="user")

class AccessLog(Base):
    __tablename__ = "access_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    institution_name = Column(String) 
    access_type = Column(String) 
    request_date = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String, default="ACTIVE") 

    user = relationship("User", back_populates="access_logs")