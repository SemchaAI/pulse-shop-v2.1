import { SearchX } from 'lucide-react';
import Link from 'next/link';

export default async function NotFound() {
  return (
    <div className="flex flex-col grow gap-3 justify-center items-center h-full">
      <h2 className="flex gap-3 text-primary">
        Not Found <SearchX />
      </h2>
      <p>Could not find requested resource</p>
      <Link
        className="text-primary"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
