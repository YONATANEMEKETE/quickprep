import Footer from '@/components/Footer';
import { BgShapeTwo } from '@/components/ui/bg-shapes';
import Dropzone from '@/components/ui/Dropzone';

export const revalidate = 60;

export default async function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center pt-44">
      <BgShapeTwo />
      <Dropzone />
    </main>
  );
}
