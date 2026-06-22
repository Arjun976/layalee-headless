import Banner from '@/feature/home/Banner';
import Category from '@/feature/home/Category';
import Featured from '@/feature/home/Featured';
import ExpertAssistance from '@/feature/home/Expert-Assistance';
import GetInspired from '@/feature/home/Get-inspired';
import PromiseSection from '@/feature/home/Promise';
import { getHeaderAndHomePageData } from '@/lib/wordpress';

export default async function Home() {
  const { homepage, productCategories, products } = await getHeaderAndHomePageData();
  const baseUrl = process.env.Secret;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Banner homepage={homepage} />
      <Category homepage={homepage} productCategories={productCategories} />
      <Featured homepage={homepage} products={products} />
      <ExpertAssistance homepage={homepage} />
      <GetInspired homepage={homepage} baseUrl={baseUrl} />
      <PromiseSection homepage={homepage} />
    </main>
  );
}

