from pdf_handler import (
    extract_text,
    chunk_text
)

from vector_store import (
    create_vector_store,
    search_chunks
)


text = extract_text("maths.pdf")

chunks = chunk_text(text)

index, embeddings = create_vector_store(
    chunks
)

results = search_chunks(
    "integration",
    chunks,
    index
)

print(results)