import ProductSection from '@/feature/product_detail/ProductSection';
import CraftedIndoorSection from '@/feature/product_detail/CraftedIndoorSection';
import BuiltEveryOutdoorSpace from '@/feature/product_detail/BuiltEveryOutdoorSpace';
import ProductFaq from '@/feature/Product/Faq';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <ProductSection />
      <CraftedIndoorSection />
      <BuiltEveryOutdoorSpace />
      <ProductFaq />
    </main>
  );
}

