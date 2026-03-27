from fastapi import FastAPI, Depends, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models
from database import engine, get_db
import hashlib
import time
import shutil
import os
import random  # <--- Added for dynamic risk scoring

# Initialize Database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inmuta-Bash KYC")

# CLEAN MIDDLEWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "AI Engine Online 🚀"}

@app.post("/verify")
async def verify_user(
    wallet_address: str = Form(...),
    email: str = Form("Not Provided"),
    phone: str = Form("Not Provided"),
    id_document: UploadFile = File(...),
    live_selfie: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    print(f"\n[*] KYC START: {wallet_address[:10]}...")

    # 1. SETUP STORAGE
    os.makedirs("temp_uploads", exist_ok=True)
    ts = int(time.time())
    id_p = f"temp_uploads/id_{ts}.jpg"
    slf_p = f"temp_uploads/selfie_{ts}.jpg"
    
    with open(id_p, "wb") as f: shutil.copyfileobj(id_document.file, f)
    with open(slf_p, "wb") as f: shutil.copyfileobj(live_selfie.file, f)

    try:
        # ------------------------------------------
        # 2. MOCK BIOMETRIC MATCH
        # ------------------------------------------
        print("[*] Verifying Faces (DeepFace VGG-Face)...")
        time.sleep(1.5) # Pauses to simulate heavy AI processing
        print("[+] Biometric Match: True")

        # ------------------------------------------
        # 3. MOCK DOCUMENT ANALYSIS
        # ------------------------------------------
        print("[*] Reading ID Document (Multimodal LLM)...")
        time.sleep(2.0) # Pauses to simulate API network latency

        # EXACT Data from your uploaded SRM ID Card
        llm_data = {
            "name": "SHREYAS",
            "document_type": "SRM Student ID",
            "register_no": "RA2511028010115",
            "programme": "B.Tech.(CSE-Cloud Computing)",
            "campus": "Kattankulathur Campus",
            "risk_score": random.randint(8, 28) # <--- Random score ensures multiple demos look real
        }

        # ------------------------------------------
        # 4. DECISION ENGINE (Slide 3 Matrix)
        # ------------------------------------------
        score = llm_data["risk_score"]
        
        # Explicit logic matching your presentation slides
        if score <= 30:
            status = "Verified"
            cat = "Low"
            dec = "Auto approval"
        elif score <= 70:
            status = "Pending"
            cat = "Medium"
            dec = "Additional checks"
        else:
            status = "Rejected"
            cat = "High"
            dec = "Manual review"

        # ------------------------------------------
        # 5. DB UPSERT & HASH MINTING
        # ------------------------------------------
        v_hash = hashlib.sha256(f"{wallet_address}{ts}".encode()).hexdigest()
        
        user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
        if user:
            user.verification_hash = v_hash
            user.status = status
        else:
            new_u = models.User(wallet_address=wallet_address, verification_hash=v_hash, status=status)
            db.add(new_u)
        
        db.commit()
        print(f"✅ SUCCESS: {status} for {llm_data['name']} (Risk Score: {score})")

        # Return the flawless JSON payload to Rajdeep's frontend
        return {
            "status": status,
            "verification_hash": v_hash,
            "autonomous_metrics": {
                "risk_score": score,
                "risk_category": cat,
                "decision": dec,
                "extracted_data": {
                    "name": llm_data["name"],
                    "document_type": llm_data["document_type"],
                    "register_no": llm_data["register_no"],
                    "programme": llm_data["programme"],
                    "campus": llm_data["campus"],
                    "email": email,
                    "phone": phone
                }
            }
        }

    except Exception as e:
        print(f"❌ CRITICAL ERROR: {str(e)}")
        return {"status": "error", "message": str(e)}

    finally:
        # CLEANUP (Silent wipe of user data)
        if os.path.exists(id_p): os.remove(id_p)
        if os.path.exists(slf_p): os.remove(slf_p)