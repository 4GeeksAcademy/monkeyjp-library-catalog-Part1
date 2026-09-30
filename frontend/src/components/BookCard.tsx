import type { Book } from "../types/book";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <article className="book-card">
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <small>{book.year}</small>
      <span>{book.available ? "Available" : "Unavailable"}</span>
    </article>
  );
}
