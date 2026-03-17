import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WorkWithUsContent } from "@/components/home/WorkWithUsContent";

export default function TrabajaEnSumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <WorkWithUsContent />
      </main>
      <Footer />
    </div>
  );
}
