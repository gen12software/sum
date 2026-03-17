import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AffiliateTasks } from "@/components/home/AffiliateTasks";

export default function GestionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="grow pt-12 pb-24">
        <AffiliateTasks />
      </main>
      <Footer />
    </div>
  );
}
