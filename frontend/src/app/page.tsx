// pages/index.tsx
"use client";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import Book from './book';

interface BookProps {
  id: number;
  title: string;
  status: string;
}

export default function Home() {
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState<BookProps[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}/books/`);
      setBooks(response.data);
    } catch (error: any) {
      toast.error(error?.response)
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    try {
      await axios.post(`${process.env.BACKEND_URL}/books/`, { title });
      fetchBooks();
      setTitle('');
      toast.success("Book added successfully")
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdateBookTitle = async (bookId: number, title: string) => {
    try {
      await axios.patch(`${process.env.BACKEND_URL}/book-title/${bookId}`, { title: title });
      fetchBooks();
      toast.success("Book updated successfully")
    } catch (error) {
      toast.error("An error occurred")
      console.error('Error updating status:', error);
    }
  }; 

  const handleChangeStatus = async (bookId: number, newStatus: string) => {
    try {
      await axios.patch(`${process.env.BACKEND_URL}/books/${bookId}`, { status: newStatus });
      fetchBooks();
      toast.success(
        `book set to ${newStatus == "to-read" ? "read" :
        newStatus
       }`
      )
    } catch (error) {
      toast.error("An error occurred")
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (bookId: number) => {
    try {
      await axios.delete(`${process.env.BACKEND_URL}/books/${bookId}`);
      fetchBooks();
      toast.success("Book deleted Successfully")
    } catch (error: any) {
      toast.error("Error delete book")
      console.error('Error deleting book:', error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Book Tracker</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
          className="p-2 border rounded-md flex-grow"
          required
        />
        <button
          onClick={handleAddBook}
          className={`px-4 py-2 rounded-md ${!title ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          disabled = {!title}
        >
          {!title ? "Enter Title" : "Add Book"}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <h2 className="text-lg font-semibold">To-Read</h2>
          {books
            .filter(book => book.status === 'to-read')
            .map(book => (
              <Book 
                key={book.id}
                book={book} 
                handleChangeStatus={handleChangeStatus} 
                handleUpdateBookTitle={handleUpdateBookTitle}
                handleDelete={handleDelete} 
                status={'reading'} 
              />
            ))}
        </div>
        <div className="col-span-1">
          <h2 className="text-lg font-semibold">In-Progress</h2>
          {books
            .filter(book => book.status === 'reading')
            .map(book => (
              <Book 
                key={book.id}
                book={book} 
                handleUpdateBookTitle={handleUpdateBookTitle}
                handleChangeStatus={handleChangeStatus} 
                handleDelete={handleDelete} 
                status={'to-read'} 
              />
            ))}
        </div>
        <div className="col-span-1">
          <h2 className="text-lg font-semibold">Completed</h2>
          {books
            .filter(book => book.status === 'completed')
            .map(book => (
              <Book 
                key={book.id}
                book={book} 
                handleUpdateBookTitle={handleUpdateBookTitle}
                handleChangeStatus={handleChangeStatus} 
                handleDelete={handleDelete} 
                status={'to-read'} 
              />
            ))}
        </div>
      </div>
    </div>
    </>
  );
}
