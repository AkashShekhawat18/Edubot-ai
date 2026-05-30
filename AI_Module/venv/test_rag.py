from pdf_handler import (
    extract_text,
    chunk_text
)

from vector_store import (
    create_vector_store
)

from chatbot import (
    ask_chatbot
)

text = extract_text("maths.pdf")

chunks = chunk_text(text)

index, embeddings = create_vector_store(
    chunks
)

question = input(
    "Ask Question: "
)

answer = ask_chatbot(
    question,
    chunks,
    index
)

print("\nANSWER:\n")

print(answer)