import type { ReactNode } from 'react';
import Link from 'next/link';

export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-2 border-gray-500">
        <nav className="container mx-auto flex justify-between">
          <ul className="flex border border-gray-500">
            <li>
              <Link href={'/articles'}>Logo</Link>
            </li>
            <li>
              <Link href={'/articles'}>Recent Articles</Link>
            </li>
            <li>
              <Link href={'/about'}>About</Link>
            </li>
          </ul>
          <ul className="flex border border-gray-500">
            <li>
              <Link href={'/my-articles'}>My Articles</Link>
            </li>
            <li>
              <Link href={'/editor'}>Create Article</Link>
            </li>
            <li>
              <Link href={'/log-in'}>Log in</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container mx-auto">{children}</div>
    </>
  );
}
