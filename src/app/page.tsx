import { BgShapeTwo } from '@/components/ui/bg-shapes';
import Dropzone from '@/components/ui/Dropzone';

export default async function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center  overflow-clip">
      <BgShapeTwo />
      <Dropzone />
    </main>
  );
}
