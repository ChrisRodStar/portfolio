import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="p-4 max-w-6xl mx-auto w-full shrink-0">
        <Nav />
      </div>
      {children}
      <div className="mt-auto p-4 max-w-6xl mx-auto w-full shrink-0">
        <Footer />
      </div>
    </>
  );
}
