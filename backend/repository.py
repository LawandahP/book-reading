import psycopg2

class BookRepo:
    def __init__(self):
        self.connection = psycopg2.connect(
            dbname="books_db",
            user="postgres",
            password="admin",
            host="books-database",
            port="5432"
        )
        self.cursor = self.connection.cursor()
        self.cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                title TEXT,
                status TEXT DEFAULT 'to-read'

            )
            """
        )
        self.connection.commit()

    def postBook(self, title):
        self.cursor.execute("INSERT INTO books (title) VALUES (%s)", (title,))
        self.connection.commit()
        bookId = self.cursor.lastrowid
        return {"id": bookId, "title": title, "status": "to-read"}
    
    def fetchAllBooks(self):
        self.cursor.execute("SELECT * FROM books")
        books = self.cursor.fetchall()
        bookList = [{"id": book[0], "title": book[1], "status": book[2]} for book in books]
        return bookList

    def fetchBook(self, bookId):
        self.cursor.execute("SELECT * FROM books WHERE id=%s", (bookId,))
        return self.cursor.fetchone()

    def updateBook(self, bookId, status):
        self.cursor.execute("UPDATE books SET status=%s WHERE id=%s", (status, bookId))
        self.connection.commit()
        return self.cursor.rowcount > 0
    
    def updateBookTitle(self, bookId, title):
        self.cursor.execute("UPDATE books SET title=%s WHERE id=%s", (title, bookId))
        self.connection.commit()
        return self.cursor.rowcount > 0

    def deleteBook(self, bookId: int):
        self.cursor.execute("DELETE FROM books WHERE id=%s", (bookId,))
        self.connection.commit()
        return self.cursor.rowcount > 0

