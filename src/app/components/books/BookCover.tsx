import Image from "next/image";
import { BookOpen } from "lucide-react";

interface BookCoverProps {
  imagePath: string | null;
  title: string;
  sizes: string;
}

export function BookCover({ imagePath, title, sizes }: BookCoverProps) {
  if (imagePath) {
    return <Image src={imagePath} alt={title} fill sizes={sizes} className="object-cover" />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-tint-sun p-3 text-center text-foreground">
      <BookOpen aria-hidden className="h-8 w-8" strokeWidth={2.5} />
      <span className="text-xs font-bold">Cover coming soon</span>
    </div>
  );
}
