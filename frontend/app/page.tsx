import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import Statistics from "@/components/home/Statistics";
import Footer from "@/components/home/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <Statistics />
      <Footer />
      
    </>
  );
}

