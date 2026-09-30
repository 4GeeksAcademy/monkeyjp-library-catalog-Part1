import { FormEvent, useState } from "react";
import { createBook } from "../services/books";
import type { Book } from "../types/book";

type Props = {
  onCreated: (book: Book) => void;
};

export default function BookForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const created = await createBook({
      title,
      author,
      year,
      available: true,
    });

    onCreated(created);
    setTitle("");
    setAuthor("");
  }

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        placeholder="Author"
        required
      />
      <input
        type="number"
        value={year}
        onChange={(event) => setYear(Number(event.target.value))}
        required
      />
      <button type="submit">Add book</button>
    </form>
  );
}
