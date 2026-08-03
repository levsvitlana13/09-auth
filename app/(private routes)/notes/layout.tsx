import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function NotesLayout({
  children,
}: LayoutProps) {
  return <>{children}</>;
}