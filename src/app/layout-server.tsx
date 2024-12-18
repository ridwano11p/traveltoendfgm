import FooterWrapper from "@/components/shared/FooterWrapper";

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
      <FooterWrapper />
    </div>
  );
}