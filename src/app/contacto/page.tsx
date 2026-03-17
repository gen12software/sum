import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactContent } from "@/components/home/ContactContent";

export default function ContactoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <ContactContent />
      </main>
      <Footer />
    </div>
  );
}
