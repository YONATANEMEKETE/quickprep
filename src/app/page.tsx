import { BgShapeTwo } from '@/components/ui/bg-shapes';
import { Button } from '@/components/ui/button';
import Dropzone from '@/components/ui/Dropzone';

export default function Home() {
  return (
    <main className="relative min-h-[70vh] grid place-content-center">
      <BgShapeTwo />
      <Dropzone />
    </main>
  );
}
