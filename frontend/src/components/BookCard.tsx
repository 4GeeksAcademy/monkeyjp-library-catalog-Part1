import { BookOpen, CheckCircle2, XCircle } from "lucide-react";
import type { Book } from "../types/book";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        <BookOpen size={24} />
      </div>

      <h2 className="mb-1 text-lg font-semibold text-slate-900">
        {book.title}
      </h2>

      <p className="text-sm text-slate-500">{book.author}</p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-sm font-medium text-slate-500">
          {book.year}
        </span>

        {book.available ? (
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <CheckCircle2 size={14} />
            Available
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
            <XCircle size={14} />
            Unavailable
          </span>
        )}
      </div>
    </article>
  );
}