import * as imageRepo from '@/lib/repositories/image.repository';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_IMAGES = 3;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function saveImages(bookId: number, files: File[]): Promise<void> {
  if (files.length > MAX_IMAGES) {
    throw new Error(`Maximum ${MAX_IMAGES} images allowed`);
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`Invalid file type: ${file.type}`);
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${crypto.randomUUID()}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    imageRepo.createImage(bookId, `/uploads/${filename}`);
  }
}
