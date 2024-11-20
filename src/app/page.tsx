import { BgShapeTwo } from '@/components/ui/bg-shapes';
import Dropzone from '@/components/ui/Dropzone';

export const revalidate = 60;

export default function Home() {
  return (
    <main className="relative min-h-[70vh] grid place-content-center">
      <BgShapeTwo />
      <Dropzone />
    </main>
  );
}
