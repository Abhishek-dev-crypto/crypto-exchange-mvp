'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function GlobalNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path ? 'text-blue-400 font-semibold' : 'hover:text-blue-400';

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* Branding */}
        <Link href="/" className="text-2xl font-bold hover:text-blue-400">
          AllChain
        </Link>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center space-x-6">
          <NavLinks pathname={pathname} />
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mt-4 flex flex-col space-y-2 md:hidden">
          <NavLinks pathname={pathname} mobile />
        </div>
      )}
    </nav>
  );
}

function NavLinks({ pathname, mobile = false }: { pathname: string; mobile?: boolean }) {
  const baseStyle = mobile ? '' : 'transition';

  const linkClass = (path: string) =>
    `${baseStyle} ${pathname === path ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'}`;

  const links = [
    { name: 'Trade', href: '/trade' },
    { name: 'Web3', href: '/web3' },
    { name: 'NFT', href: '/nft' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Legal', href: '/legal' },
    { name: 'Support', href: '/support' },
    { name: 'Help', href: '/help' },
    { name: 'Security', href: '/security' },
  ];

  return (
    <>
      {links.map(({ name, href }) => (
        <Link key={href} href={href}>
          <span className={linkClass(href)}>{name}</span>
        </Link>
      ))}
    </>
  );
}
