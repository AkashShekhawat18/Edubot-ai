import faiss
import numpy as np

from sentence_transformers import SentenceTransformer


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def create_vector_store(chunks):

    embeddings = model.encode(chunks)

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(
        np.array(embeddings)
    )

    return index, embeddings


def search_chunks(
    question,
    chunks,
    index,
    k=3
):

    question_embedding = model.encode(
        [question]
    )

    distances, indices = index.search(
        np.array(question_embedding),
        k
    )

    results = []

    for idx in indices[0]:

        results.append(
            chunks[idx]
        )

    return results