import Banner from '@/feature/home/Banner';
import Category from '@/feature/home/Category';
import Featured from '@/feature/home/Featured';
import { getHeaderAndHomePageData } from '@/lib/wordpress';

export default async function Home() {
  const { homepage } = await getHeaderAndHomePageData();

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Banner homepage={homepage} />
      <Category />
      <Featured/>
    </main>
  );
}

