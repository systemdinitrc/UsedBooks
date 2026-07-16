import { BookCatalog } from "../components/books/BookCatalog";
import { listBooks } from "@/lib/services/book.service";

export const metadata = { title: "Browse books" };
export const dynamic = "force-dynamic";

export default function BrowsePage() {
  return <BookCatalog books={listBooks()} variant="browse" />;
}
