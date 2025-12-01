from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Msg(BaseModel):
    message: str

# --- Simple stored responses ---
KNOWLEDGE = {
    "weather": "it is 29 degrees F. It might snow today!",
    "what is your name": "I am your simple local chatbot.",
    "time": "I cannot check real time, but I hope you're having a good day!",
    "hi": "Hello! How can I help?",
    "hello": "Hi! What’s up?",
}

@app.post("/chat")
def chat(data: Msg):

    msg = data.message.lower()

    # Search in stored responses
    for key in KNOWLEDGE:
        if key in msg:
            return {"reply": KNOWLEDGE[key]}

    # Default fallback
    return {"reply": "I don't know this yet, but I'm learning!"}
