import os
from dotenv import load_dotenv
import google.generativeai as genai
load_dotenv(".env")

print("ENV EXISTS =", os.path.exists(".env"))
print("KEY =", os.getenv("GEMINI_KEYS"))
API_KEYS = os.getenv("GEMINI_KEYS").split(",")

genai.configure(api_key=API_KEYS[0])

model = genai.GenerativeModel("gemini-2.5-flash")

def ask_gemini(question):

    response = model.generate_content(question)

    return response.text
from vector_store import search_chunks

def ask_chatbot(question, chunks, index):

    context_chunks = search_chunks(
        question,
        chunks,
        index
    )

    context = "\n".join(
        context_chunks
    )

    prompt = f"""
You are a Maths Teacher.

Answer ONLY from the context below.

Context:
{context}

Question:
{question}

Explain step by step.
"""

    response = model.generate_content(
        prompt
    )

    return response.text