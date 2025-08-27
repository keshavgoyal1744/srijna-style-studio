import FashionHero from "@/components/FashionHero";
import CollectionsShowcase from "@/components/CollectionsShowcase";
import AboutBrand from "@/components/AboutBrand";
import GlobalReach from "@/components/GlobalReach";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <FashionHero />
      <CollectionsShowcase />
      <AboutBrand />
      <GlobalReach />
      <ContactSection />
    </main>
  );
};

export default Index;
