import { NextResponse } from 'next/server';
import * as bookService from '@/lib/services/book.service';
import * as imageService from '@/lib/services/image.service';
import { createBookSchema } from '@/lib/validation/book.schema';
import type { ApiResponse } from '@/lib/types/api';
import type { BookSummary } from '@/lib/types/book';

export async function GET() {
  try {
    const books = bookService.listBooks();
    return NextResponse.json<ApiResponse<BookSummary[]>>({
      success: true,
      data: books,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const parsed = createBookSchema.safeParse({
      title: formData.get('title'),
      author: formData.get('author'),
      description: formData.get('description') || undefined,
      suggested_price: formData.get('suggested_price'),
    });

    if (!parsed.success) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const bookId = bookService.createBook(parsed.data);

    const imageFiles = formData.getAll('images') as File[];
    const validFiles = imageFiles.filter((f) => f instanceof File && f.size > 0);
    if (validFiles.length > 0) {
      await imageService.saveImages(bookId, validFiles);
    }

    return NextResponse.json<ApiResponse<{ book_id: number }>>(
      { success: true, data: { book_id: bookId } },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create listing';
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
