interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function FilterLayout({
  children,
  sidebar,
}: FilterLayoutProps) {
  return (
    <div>
      {sidebar}
      {children}
    </div>
  );
}