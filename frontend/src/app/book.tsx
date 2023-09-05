import React, { useState } from 'react'

interface Book {
    id: number;
    title: string;
    status: string
  }

interface BookProps {
    status: string
    book: Book;
    handleChangeStatus: (bookId: number, status: string) => void;
    handleDelete: (bookId: number) => void;
    handleUpdateBookTitle: any
}
const Book: React.FC<BookProps> = ({ book, status, handleChangeStatus, handleDelete, handleUpdateBookTitle }) => {
  const [newTitle, setNewTitle] = useState(book.title);

  return (
    <div className="border p-4 rounded-md shadow-md">
        {/* <p>{book.title}</p> */}
        <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter book title"
            className="p-2 border rounded-md flex-grow"
            required
        />
        <div className="flex gap-2 mt-2">
            <button
                onClick={() => handleChangeStatus(book.id, `${book.status == "reading" ? "completed" : status}` )}
                className={
                    book.status == "reading" ? 
                    `mt-2 bg-purple-500 text-white px-2 py-1 rounded` : 
                    `mt-2 bg-green-500 text-white px-2 py-1 rounded`
                }
            >
                {book.status == "to-read" ? "Start Reading" : book.status == "reading" ? "Complete" : book.status == "completed" ? "Back to read" : ""}
            </button>

            { book.status == "reading" && 
                <button
                    onClick={() => handleChangeStatus(book.id, status)}
                    className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
                >
                    Back To Read
                </button>
            }

            { book.status != "reading" &&
                <button
                    onClick={() => handleDelete(book.id)}
                    className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                    Delete
                </button>
            }
            <button
                onClick={() => handleUpdateBookTitle(book.id, newTitle)}
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded" 
                >
                Update Title
            </button>
        </div>
    </div>
  )
}

export default Book