import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Preloader />
      
      {/* Global Themed Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://wacczx1wb9.ufs.sh/f/kWvWLmocjl9L7mt47Ij8fYQ9bWBJ8hoyzqX42mRjMEDNtKIL" 
          alt="Site Background" 
          className="w-full h-full object-cover opacity-10 blur-xl" 
        />
        <div className="absolute inset-0 bg-[#020617]/80" />
      </div>

      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
