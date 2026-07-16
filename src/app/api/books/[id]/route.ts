import { NextResponse } from 'next/server';
import * as bookService from '@/lib/services/book.service';
import type { ApiResponse } from '@/lib/types/api';
import type { BookDetail } from '@/lib/types/book';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const bookId = Number(id);

    if (!Number.isSafeInteger(bookId) || bookId <= 0) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Invalid book ID' },
        { status: 400 }
      );
    }

    const book = bookService.getBook(bookId);

    if (!book) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<BookDetail>>({
      success: true,
      data: book,
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'Failed to fetch book details' },
      { status: 500 }
    );
  }
}
