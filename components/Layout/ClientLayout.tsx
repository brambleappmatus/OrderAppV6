'use client';

import { NextFont } from 'next/dist/compiled/@next/font';
import MobileMenu from './MobileMenu';
import SideMenu from './SideMenu';
import FloatingFooter from '../Footer/FloatingFooter';

interface ClientLayoutProps {
  children: React.ReactNode;
  inter: NextFont;
}

export default function ClientLayout({ children, inter }: ClientLayoutProps) {
  return (
    <div className={`${inter.className} min-h-screen flex flex-col`}>
      <div className="flex-1 flex flex-col bg-white dark:bg-zinc-900">
        <div className="xs:hidden">
          <MobileMenu />
        </div>
        <div className="hidden xs:block">
          <SideMenu />
        </div>
        <main className="flex-1 xs:ml-sidebar transition-all duration-300">
          {children}
        </main>
        <FloatingFooter />
      </div>
    </div>
  );
}