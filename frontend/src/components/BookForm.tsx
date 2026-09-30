import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";
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
    setYear(new Date().getFullYear());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Add a new book
        </h2>
        <p className="text-sm text-slate-500">
          Add a title to the library catalog.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Book title"
          required
          className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <input
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Author"
          required
          className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <input
          type="number"
          value={year}
          onChange={(event) => setYear(Number(event.target.value))}
          required
          className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add book
        </button>
      </div>
    </form>
  );
}