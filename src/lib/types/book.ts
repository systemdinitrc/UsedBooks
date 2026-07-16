export interface Book {
  book_id: number;
  title: string;
  author: string;
  description: string | null;
  suggested_price: number;
}

export interface BookImage {
  image_id: number;
  book_id: number;
  image_path: string;
}

export interface BookSummary extends Book {
  thumbnail: string | null;
  bid_count: number;
}

export interface BookDetail extends Book {
  images: BookImage[];
  highest_bid: number | null;
}
