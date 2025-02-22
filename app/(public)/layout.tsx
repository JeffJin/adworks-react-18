export default function PublicLayout({
                                          children
                                        }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <p>PUBLIC LAYOUT</p>
     {children}
    </div>
  );
}
