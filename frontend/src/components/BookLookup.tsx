import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { getBookById } from "../services/books";
import type { Book } from "../types/book";
import BookCard from "./BookCard";

type LookupStatus = "idle" | "loading" | "notFound" | "error";

export default function BookLookup() {
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [status, setStatus] = useState<LookupStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = Number(bookId);
    if (!Number.isInteger(id)) {
      setBook(null);
      setStatus("error");
      return;
    }

    setBook(null);
    setStatus("loading");

    try {
      const result = await getBookById(id);
      setBook(result);
      setStatus(result ? "idle" : "notFound");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section aria-labelledby="book-lookup-title">
      <div className="mb-4">
        <h2 id="book-lookup-title" className="text-xl font-bold text-slate-900">
          Find a book by ID
        </h2>
        <p className="text-sm text-slate-500">
          Enter a book ID to view its details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex max-w-xl gap-3">
        <label htmlFor="book-id" className="sr-only">
          Book ID
        </label>
        <input
          id="book-id"
          name="bookId"
          type="number"
          step="1"
          required
          value={bookId}
          onChange={(event) => {
            setBookId(event.target.value);
            setBook(null);
            setStatus("idle");
          }}
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-60"
        >
          <Search size={18} aria-hidden="true" />
          <span>{status === "loading" ? "Searching..." : "Find"}</span>
        </button>
      </form>

      <div className="mt-4 max-w-xl" aria-live="polite">
        {status === "notFound" && (
          <p className="text-sm text-slate-600">
            No book found with ID {bookId}.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-rose-700">
            Could not load this book. Please try again.
          </p>
        )}
        {book && <BookCard book={book} />}
      </div>
    </section>
  );
}