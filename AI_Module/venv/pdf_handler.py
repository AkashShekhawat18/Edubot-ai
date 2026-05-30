import PyPDF2


# PDF se text nikalna
def extract_text(pdf_path):

    text = ""

    with open(pdf_path, "rb") as file:

        reader = PyPDF2.PdfReader(file)

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text

    return text


# Text ko chunks me divide karna
def chunk_text(text):

    chunks = []

    size = 500

    for i in range(0, len(text), size):

        chunks.append(
            text[i:i + size]
        )

    return chunks


# Main Program
text = extract_text("maths.pdf")

chunks = chunk_text(text)

print("===================================")
print("PDF EXTRACTED SUCCESSFULLY")
print("===================================")

print("\nTotal Characters:", len(text))

print("\nTotal Chunks:", len(chunks))

print("\n===================================")
print("FIRST CHUNK")
print("===================================\n")

print(chunks[0])