export default function PublicLayout({
    children
  }: { children: React.ReactNode }) {
  return (
    <>
      <p>PUBLIC LAYOUT</p>
     {children}
    </>
  );
}
