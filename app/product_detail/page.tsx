import ProductSection from '@/feature/product_detail/ProductSection';
import CraftedIndoorSection from '@/feature/product_detail/CraftedIndoorSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <ProductSection />
      <CraftedIndoorSection />
    </main>
  );
}

