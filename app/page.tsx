import Banner from '@/feature/home/Banner';
import Category from '@/feature/home/Category';
import Featured from '@/feature/home/Featured';
import FilteredProducts from '@/feature/home/FilteredProducts';
import ExpertAssistance from '@/feature/home/Expert-Assistance';
import GetInspired from '@/feature/home/Get-inspired';
import NatureInspired from '@/feature/home/nature-inspired';
import PromiseSection from '@/feature/home/Promise';
import { getHeaderAndHomePageData } from '@/lib/wordpress';

export default async function Home() {
  const { homepage, productCategories, products } = await getHeaderAndHomePageData();
  
  if (!homepage || !products) {
    throw new Error("Unable to load critical homepage data from WordPress API.");
  }

  const baseUrl = process.env.Secret;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Banner homepage={homepage} />
      <Category homepage={homepage} productCategories={productCategories} />
      <Featured homepage={homepage} products={products} />
      <FilteredProducts />
      <ExpertAssistance homepage={homepage} />
      <GetInspired homepage={homepage} baseUrl={baseUrl} />
      <PromiseSection homepage={homepage} baseUrl={baseUrl} />
      <NatureInspired homepage={homepage} baseUrl={baseUrl} />
    </main>
  );
}


