from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from schema import Book, BookUpdate
from repository import BookRepo

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",  # Update with your frontend's URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


repo = BookRepo()


@app.get("/")
def server():
    return {"success": "Server seems to be working fine!"}

@app.post("/books/")
def create_book(book: Book):
    return repo.postBook(book.title)

@app.get("/books/")
def read_books():
    book = repo.fetchAllBooks()
    if book is None:
        raise HTTPException(status_code=404, detail="No Books Found. Please add a book")
    return book

@app.get("/books/{book_id}")
def read_book(book_id: int):
    book = repo.fetchBook(book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@app.patch("/book-title/{book_id}")
def update_book_title(book_id: int, updated_book: Book):
    success = repo.updateBookTitle(book_id, updated_book.title)
    if not success:
        raise HTTPException(status_code=404, detail="Book not found")
    return JSONResponse({"message": "Book updated now"}, status_code=200)

@app.patch("/books/{book_id}")
def update_book(book_id: int, updated_book: BookUpdate):
    success = repo.updateBook(book_id, updated_book.status)
    if not success:
        raise HTTPException(status_code=404, detail="Book not found")
    return JSONResponse({"message": "Book updated now"}, status_code=200)

@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    success = repo.deleteBook(book_id)
    if not success:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": "Book deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
