from fastapi import FastAPI, Depends, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models
from database import engine, get_db
import hashlib
import time
import random

# Create tables in Postgres
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inmuta-Bash Golden Profile API")

# Allow Frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Backend is running flawlessly 🚀"}

# --- USER VERIFICATION (The "AI" Part) ---
# Make sure 'asyncio' is imported at the top of your file if it isn't already!
import asyncio

# ... (rest of your code)

@app.post("/verify")
async def verify_user(
    wallet_address: str = Form(...),
    id_document: UploadFile = File(...),
    live_selfie: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Check if user already exists
    existing_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if existing_user:
        return {
            "status": "Success", 
            "message": "User already registered", 
            "verification_hash": existing_user.verification_hash
        }

    # --- ADVANCED SIMULATED AI PROCESSING (The 15-Second Show) ---
    print("\n" + "="*50)
    print(f"🔒 INMUTA-BASH SECURE ENCLAVE INITIALIZED")
    print(f"📥 Payload received for Wallet: {wallet_address[:8]}...{wallet_address[-4:]}")
    print("="*50)
    
    # We use asyncio.sleep here so it doesn't freeze the whole FastAPI server
    await asyncio.sleep(1.5)
    print(f"[*] Extracting High-Res Image Data: {id_document.filename} & {live_selfie.filename}...")
    
    await asyncio.sleep(2.5)
    print("[*] Normalizing image lighting, pitch, and yaw angles...")
    
    await asyncio.sleep(3.0)
    print("[*] Running DeepFace Core: Mapping 128-point facial geometry mesh...")
    
    await asyncio.sleep(2.0)
    print("[*] Cross-referencing Biometric Mesh (ID vs. Selfie Live Capture)...")
    
    await asyncio.sleep(3.5)
    print("[*] Executing Anti-Spoofing & Depth Liveness Heuristics...")
    
    await asyncio.sleep(2.5)
    confidence_score = round(random.uniform(96.4, 99.8), 2)
    print(f"[+] Biometric Match Confirmed! Confidence Score: {confidence_score}%")
    print("[*] Generating Zero-Knowledge Golden Hash...")
    await asyncio.sleep(1.0)
    
    # Generate the Golden Hash
    raw_string = f"{wallet_address}{time.time()}SecretSalt"
    verification_hash = hashlib.sha256(raw_string.encode()).hexdigest()
    fake_ipfs_cid = f"ipfs://Qm{hashlib.sha256(verification_hash.encode()).hexdigest()[:40]}"

    # Save to Postgres
    new_user = models.User(
        wallet_address=wallet_address,
        verification_hash=verification_hash,
        ipfs_cid=fake_ipfs_cid,
        status="Verified"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Automatically create the first "Genesis" log
    initial_log = models.AccessLog(
        user_id=new_user.id,
        institution_name="System Ledger",
        access_type="Identity Minting",
        status="COMPLETED"
    )
    db.add(initial_log)
    db.commit()

    print(f"✅ SUCCESS: Profile Minted to Ledger. Hash: {verification_hash[:12]}...")
    print("="*50 + "\n")

    return {
        "status": "Success",
        "message": "Identity Verified and Minted to Ledger",
        "wallet_address": new_user.wallet_address,
        "verification_hash": new_user.verification_hash
    }
    # Check if user already exists
    existing_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if existing_user:
        return {
            "status": "Success", 
            "message": "User already registered", 
            "verification_hash": existing_user.verification_hash
        }

    # --- SIMULATED AI PROCESSING (Option B) ---
    print(f"🔍 AI Subsystem Initialized: Analyzing Face Geometry...")
    print(f"📸 Received ID: {id_document.filename}")
    print(f"👤 Received Selfie: {live_selfie.filename}")
    
    # Simulate processing time for the demo
    time.sleep(2.5) 
    
    # Generate fake match data to look professional in logs
    confidence_score = round(random.uniform(94.2, 99.1), 2)
    print(f"✅ AI Match Confirmed: {confidence_score}% Confidence Score.")
    
    # Generate the Golden Hash
    raw_string = f"{wallet_address}{time.time()}SecretSalt"
    verification_hash = hashlib.sha256(raw_string.encode()).hexdigest()
    fake_ipfs_cid = f"ipfs://Qm{hashlib.sha256(verification_hash.encode()).hexdigest()[:40]}"

    # Save to Postgres
    new_user = models.User(
        wallet_address=wallet_address,
        verification_hash=verification_hash,
        ipfs_cid=fake_ipfs_cid,
        status="Verified"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Automatically create the first "Genesis" log
    initial_log = models.AccessLog(
        user_id=new_user.id,
        institution_name="System Ledger",
        access_type="Identity Minting",
        status="COMPLETED"
    )
    db.add(initial_log)
    db.commit()

    return {
        "status": "Success",
        "message": "Identity Verified and Minted to Ledger",
        "wallet_address": new_user.wallet_address,
        "verification_hash": new_user.verification_hash
    }

# --- INSTITUTION SEARCH (Triggers a Log) ---
@app.get("/institution/check/{verification_hash}")
def check_kyc_status(verification_hash: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.verification_hash == verification_hash).first()
    
    if user:
        # Create a dynamic log entry to show on the user's dashboard
        institutions = ["J.P. Morgan", "Aetna Health", "Prudential", "Global Finance Bank"]
        
        new_log = models.AccessLog(
            user_id=user.id,
            institution_name=random.choice(institutions),
            access_type="Full KYC Verification",
            status="ACTIVE"
        )
        db.add(new_log)
        db.commit()

        return {
            "is_verified": True,
            "status": "Verified",
            "message": "Hash Validated on Immutable Ledger",
            "wallet_address": user.wallet_address,
            "ipfs_cid": user.ipfs_cid
        }
    else:
        raise HTTPException(status_code=404, detail="Invalid Hash: User not found.")

# --- FETCH LOGS FOR DASHBOARD ---
@app.get("/logs/{verification_hash}")
def get_user_logs(verification_hash: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.verification_hash == verification_hash).first()
    if not user:
        return []
    
    # Fetch logs and format for the frontend table
    logs = user.access_logs
    formatted_logs = [
        {
            "id": log.id,
            "institution": log.institution_name,
            "accessType": log.access_type,
            "requestDate": log.request_date.strftime("%b %d, %Y"),
            "status": log.status
        } for log in logs
    ]
    return formatted_logs[::-1] # Reverse to show newest first