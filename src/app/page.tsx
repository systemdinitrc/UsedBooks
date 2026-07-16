import { BookCatalog } from "./components/books/BookCatalog";
import { listBooks } from "@/lib/services/book.service";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <BookCatalog books={listBooks()} variant="home" />;
}
