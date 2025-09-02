import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-gray-200/40 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/60">
      <nav className="container-nice flex items-center justify-between py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SchoolHub
        </Link>
        <div className="flex gap-3 text-sm">
          <Link href="/addSchool" className="px-3 py-1.5 text-lg font-semibold tracking-tight ">
            Add School
          </Link>
          <Link href="/showSchools" className="px-3 py-1.5  text-lg font-semibold tracking-tight">
            Browse Schools
          </Link>
        </div>
      </nav>
    </header>
  );
}
