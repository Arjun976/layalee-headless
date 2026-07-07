import ProductSection from '@/feature/product_detail/ProductSection';
import CraftedIndoorSection from '@/feature/product_detail/CraftedIndoorSection';
import HowToUse from '@/feature/product_detail/HowToUse';
import BuiltEveryOutdoorSpace from '@/feature/product_detail/BuiltEveryOutdoorSpace';
import ProductFaq from '@/feature/Product/Faq';
import NatureInspired from '@/feature/home/nature-inspired';
import { getHeaderAndHomePageData, getLayaleProduct } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [product, homeData] = await Promise.all([
    getLayaleProduct(slug),
    getHeaderAndHomePageData()
  ]);

  if (!product) {
    notFound();
  }

  // Extract hostname from headers to pass down for image host rewrites
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const hostname = host.split(':')[0];

  const { homepage } = homeData || {};
  const baseUrl = process.env.Secret;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <ProductSection productData={product} />
      
      {product.about && (
        <CraftedIndoorSection aboutData={product.about} hostname={hostname} />
      )}

      {product.howToUse?.enabled && (
        <HowToUse howToUseData={product.howToUse} hostname={hostname} />
      )}

      {product.builtForOutdoor?.enabled && (
        <BuiltEveryOutdoorSpace builtForOutdoor={product.builtForOutdoor} hostname={hostname} />
      )}

      {product.faq?.enabled && (
        <ProductFaq 
          title={product.faq.title} 
          subtitle={product.faq.subtitle} 
          paragraphs={product.faq.paragraphs} 
          buttonText={product.faq.button?.text} 
          buttonUrl={product.faq.button?.url} 
          items={product.faq.items} 
        />
      )}

      <NatureInspired homepage={homepage} baseUrl={baseUrl} />
    </main>
  );
}
