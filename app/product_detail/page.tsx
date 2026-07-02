import ProductSection from '@/feature/product_detail/ProductSection';
import CraftedIndoorSection from '@/feature/product_detail/CraftedIndoorSection';
import BuiltEveryOutdoorSpace from '@/feature/product_detail/BuiltEveryOutdoorSpace';
import ProductFaq from '@/feature/Product/Faq';
import NatureInspired from '@/feature/home/nature-inspired';
import { getHeaderAndHomePageData } from '@/lib/wordpress';

export default async function Home() {
  const { homepage } = await getHeaderAndHomePageData();
  const baseUrl = process.env.Secret;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <ProductSection />
      <CraftedIndoorSection />
      <ProductFaq />
      <BuiltEveryOutdoorSpace />
      <NatureInspired homepage={homepage} baseUrl={baseUrl} />
    </main>
  );
}

