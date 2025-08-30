import FashionHero from "@/components/FashionHero";
import CollectionsShowcase from "@/components/CollectionsShowcase";
import CustomerReviews from "@/components/CustomerReviews";
import AboutBrand from "@/components/AboutBrand";
import GlobalReach from "@/components/GlobalReach";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <FashionHero />
      <CollectionsShowcase />
      <CustomerReviews />
      <AboutBrand />
      <GlobalReach />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
