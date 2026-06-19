import Banner from '@/feature/home/Banner';
import Category from '@/feature/home/Category';
import Featured from '@/feature/home/Featured';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Banner />
      <Category />
      <Featured/>
    </main>
  );
}
