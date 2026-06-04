import os
from dotenv import load_dotenv
import google.generativeai as genai

from vector_store import search_chunks

# -------------------------
# ENV SETUP
# -------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

ENV_PATH = os.path.join(
    BASE_DIR,
    ".env"
)

load_dotenv(ENV_PATH)

print("ENV PATH =", ENV_PATH)
print("ENV EXISTS =", os.path.exists(ENV_PATH))
print("KEY =", os.getenv("GEMINI_KEYS"))

api_key = os.getenv("GEMINI_KEYS")

if not api_key:
    raise Exception(
        f"GEMINI_KEYS not found in {ENV_PATH}"
    )

API_KEYS = api_key.split(",")

# -------------------------
# GEMINI SETUP
# -------------------------

genai.configure(
    api_key=API_KEYS[0]
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

# -------------------------
# DIRECT GEMINI
# -------------------------

def ask_gemini(question):

    response = model.generate_content(
        question
    )

    return response.text

# -------------------------
# RAG CHATBOT
# -------------------------

def ask_chatbot(question, chunks, index):

    context_chunks = search_chunks(
        question,
        chunks,
        index
    )

    print("\nQUESTION =", question)
    print("\nCONTEXT CHUNKS =")
    print(context_chunks)

    context = "\n".join(
        context_chunks
    )

    prompt = f"""
You are a Maths Teacher.

IMPORTANT:

For maths answers:
- Never output LaTeX.
- Never output symbols like:
  $, \\frac, \\int, \\sum, \\sqrt
- Convert every mathematical expression into normal readable text.

Examples:

BAD:
$\\int x^2 dx = \\frac{{x^3}}{{3}} + C$

GOOD:
Integration of x² = x³/3 + C

BAD:
\\frac{{a+b}}{{c}}

GOOD:
(a+b)/c

BAD:
\\sqrt{{x}}

GOOD:
square root of x

Rules:
- Give final answer first.
- Keep answers short unless explanation is requested.
- Explain like a school teacher.
- Use plain English.
- Never show raw document text.

Context:
{context}

Question:
{question}
"""

    response = model.generate_content(
        prompt
    )

    return response.text

# -------------------------
# API ENTRY POINT
# -------------------------


def get_response(question):

    return ask_chatbot(
        question,
        chunks,
        index
    )