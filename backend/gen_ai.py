import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain.chains import LLMChain

# Load environment variables
load_dotenv()

# Step 4: Initialize the Google Generative AI model with appropriate settings for responses
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key=os.getenv("API_KEY"),  # type: ignore
)

# Step 5: Create chat prompt templates
prompt1 = ChatPromptTemplate.from_template(
    """
    You are a helpful assistant who will answer the following question based on the retrieved context.
    <context>
    {context}
    </context>

    Question: {input}
    """
)

prompt2 = ChatPromptTemplate.from_template(
    """
    You are a helpful assistant who will answer the following question to the best of your knowledge, without relying on a specific retrieved context.

    Question: {input}
    """
)

# Step 8: Create a simple chain without retrieval
simple_chain = LLMChain(llm=llm, prompt=prompt2)


# Function to get an answer with retrieval
def get_answer_with_attachment(question: str) -> str:
    # Step 1: Read and load PDF documents
    pdf_path = "js_pdf.pdf"
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()

    # Step 2: Split the documents into smaller chunks for easier processing
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
    texts = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(texts)} chunks")

    # Step 3: Embed the text chunks using Gemini 1.5 model
    embedding_model = ChatGoogleGenerativeAI(
        model="gemini-1.5-pro",
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        api_key=os.getenv("API_KEY"),  # type: ignore
    )

    # Assuming the embeddings method exists; if not, replace this with an alternative that uses the same model for embeddings.
    embeddings = embedding_model.embed_documents(  # type: ignore
        texts
    )  # Hypothetical embed_documents function
    db = Chroma.from_documents(embeddings)

    # Step 6: Create a document chain that uses the LLM and prompt to answer questions
    document_chain = create_stuff_documents_chain(llm, prompt1)

    # Step 7: Set up the retrieval chain
    retriever = db.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, document_chain)

    response = retrieval_chain({"input": question})
    return response["output"]


# Function to get a simple answer without retrieval
def get_answer(question: str) -> str:
    response = simple_chain({"input": question})
    print(response)
    return response
