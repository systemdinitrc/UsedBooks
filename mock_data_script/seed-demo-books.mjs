import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const database = new Database(path.join(rootDirectory, "database.sqlite"));

const demoBooks = [
  {
    title: "Ben Braver and the Incredible Exploding Kid",
    author: "Marcus Emerson",
    description:
      "Ben Braver: Hero or Hoax? Even though Ben Braver saved Kepler Academy from total destruction last year, he knows he still doesn't fit in at his secret school for kids with special abilities.",
    suggestedPrice: 12.99,
    cover: "book-braver.jpg",
    bids: [
      ["Maya", 13.5, "2026-07-02 09:30:00"],
      ["Noah", 14.25, "2026-07-04 14:10:00"],
      ["Ava", 15.5, "2026-07-08 11:45:00"],
      ["Leo", 16.75, "2026-07-12 16:20:00"],
    ],
  },
  {
    title: "The Crowned Kids",
    author: "Terrence Terrell",
    description:
      "A joyful adventure about five best friends who discover they've inherited tiny kingdoms and must learn to rule with kindness before the summer ends.",
    suggestedPrice: 20.6,
    cover: "book-crowned.jpg",
    bids: [
      ["Zara", 21.25, "2026-07-03 10:15:00"],
      ["Milo", 22.5, "2026-07-06 15:30:00"],
      ["Sofia", 24, "2026-07-11 12:00:00"],
    ],
  },
  {
    title: "Diary of a Wimpy Kid: The Getaway",
    author: "Jeff Kinney",
    description:
      "Greg Heffley and his family escape the cold for a tropical island resort. But paradise isn't quite what they expected, and their vacation quickly turns into a nightmare.",
    suggestedPrice: 10.4,
    cover: "book-wimpy.jpg",
    bids: [
      ["Aria", 11, "2026-07-01 09:00:00"],
      ["Eli", 12.5, "2026-07-05 13:20:00"],
      ["Nora", 13.2, "2026-07-09 10:40:00"],
      ["Finn", 14, "2026-07-13 17:10:00"],
      ["Ivy", 15.25, "2026-07-15 08:50:00"],
    ],
  },
  {
    title: "The Whispering Woods",
    author: "Lena Park",
    description:
      "When Mira wanders too deep into the forest behind her grandmother's cottage, the trees begin to whisper her name and a hidden world unfolds one leaf at a time.",
    suggestedPrice: 14.5,
    cover: "book-woods.jpg",
    bids: [
      ["Owen", 15, "2026-07-02 11:00:00"],
      ["Ruby", 16.25, "2026-07-07 14:35:00"],
      ["Theo", 17, "2026-07-10 09:25:00"],
      ["Luna", 18.5, "2026-07-14 16:05:00"],
    ],
  },
  {
    title: "Cosmo's Big Adventure",
    author: "Priya Anand",
    description:
      "Cosmo is the smallest astronaut in the academy, but on the day the space station goes dark, he's the only one brave enough to fly out and fix it.",
    suggestedPrice: 11.75,
    cover: "book-cosmo.jpg",
    bids: [
      ["Kai", 12, "2026-07-03 08:20:00"],
      ["Mia", 12.75, "2026-07-06 12:15:00"],
      ["Jude", 13.5, "2026-07-10 15:00:00"],
      ["Ella", 14.25, "2026-07-15 10:10:00"],
    ],
  },
  {
    title: "Dragon Bestie",
    author: "Rae Holloway",
    description:
      "Princess Juno was supposed to slay the dragon. Instead, she made a best friend. A giggly, fire-breathing story about picking your own kind of brave.",
    suggestedPrice: 9.99,
    cover: "book-dragon.jpg",
    bids: [
      ["Alex", 10.5, "2026-07-01 13:05:00"],
      ["Pia", 11.25, "2026-07-05 11:10:00"],
      ["Sam", 12, "2026-07-09 14:45:00"],
      ["Mina", 13, "2026-07-12 09:50:00"],
      ["Rory", 14.5, "2026-07-16 10:30:00"],
    ],
  },
];

const findBook = database.prepare("SELECT book_id FROM Book WHERE title = ? AND author = ?");
const insertBook = database.prepare(
  "INSERT INTO Book (title, author, description, suggested_price) VALUES (?, ?, ?, ?)",
);
const findImage = database.prepare("SELECT image_id FROM BookImage WHERE book_id = ? AND image_path = ?");
const insertImage = database.prepare("INSERT INTO BookImage (book_id, image_path) VALUES (?, ?)");
const findBid = database.prepare(
  "SELECT bid_id FROM Bid WHERE book_id = ? AND bidder_name = ? AND bid_amount = ?",
);
const insertBid = database.prepare(
  "INSERT INTO Bid (book_id, bidder_name, bid_amount, timestamp) VALUES (?, ?, ?, ?)",
);

const seedDemoBooks = database.transaction(() => {
  for (const book of demoBooks) {
    const existingBook = findBook.get(book.title, book.author);
    const bookId = existingBook?.book_id ?? Number(insertBook.run(
      book.title,
      book.author,
      book.description,
      book.suggestedPrice,
    ).lastInsertRowid);
    const imagePath = `/uploads/${book.cover}`;

    if (!findImage.get(bookId, imagePath)) {
      insertImage.run(bookId, imagePath);
    }

    for (const [bidderName, bidAmount, timestamp] of book.bids) {
      if (!findBid.get(bookId, bidderName, bidAmount)) {
        insertBid.run(bookId, bidderName, bidAmount, timestamp);
      }
    }
  }
});

try {
  seedDemoBooks();
  console.log(`Seeded ${demoBooks.length} demo books.`);
} finally {
  database.close();
}
