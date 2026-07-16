import { NextResponse } from 'next/server';
import * as bidService from '@/lib/services/bid.service';
import { createBidSchema } from '@/lib/validation/bid.schema';
import type { ApiResponse } from '@/lib/types/api';
import type { Bid } from '@/lib/types/bid';

type RouteParams = { params: Promise<{ id: string }> };

function parseBookId(id: string): number | null {
  const parsed = Number(id);

  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const bookId = parseBookId(id);

    if (!bookId) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Invalid book ID' },
        { status: 400 }
      );
    }

    const bids = bidService.getBookBids(bookId);

    return NextResponse.json<ApiResponse<Bid[]>>({
      success: true,
      data: bids,
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'Failed to fetch bids' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const bookId = parseBookId(id);

    if (!bookId) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Invalid book ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const parsed = createBidSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const bid = bidService.placeBid(bookId, parsed.data);

    return NextResponse.json<ApiResponse<Bid>>(
      { success: true, data: bid },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to place bid';
    const status = message === 'Book not found' ? 404 : 400;

    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: message },
      { status }
    );
  }
}
