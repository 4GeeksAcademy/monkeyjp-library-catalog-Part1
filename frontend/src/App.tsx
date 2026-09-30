import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import { getBooks } from "./services/books";
import type { Book } from "./types/book";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(() => setError("Could not load catalog"));
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Library Catalog</h1>
        <p>Books registered in the library</p>
      </header>

      <BookForm onCreated={(book) => setBooks((current) => [...current, book])} />

      {error && <p>{error}</p>}

      <section className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </main>
  );
}
