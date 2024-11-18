import { BgShapeTwo } from '@/components/ui/bg-shapes';
import { Button } from '@/components/ui/button';
import Dropzone from '@/components/ui/Dropzone';

export default function Home() {
  return (
    <main className="relative min-h-[70vh] grid place-content-center">
      <BgShapeTwo />
      <div className="flex flex-col items-center gap-y-6">
        <div className="flex flex-col items-center gap-y-4">
          <Dropzone />
          <div className="flex items-center justify-between w-full px-2">
            <p className="text-sm text-mytextlight font-semibold font-mynormal">
              Supported Formats: .pdf
            </p>
            <p className="text-sm text-mytextlight font-semibold font-mynormal">
              Max File Size: 2MB
            </p>
          </div>
        </div>

        <Button
          size={'lg'}
          className="w-full bg-gradient-to-br from-myaccent6 hover:from-myaccent5 to-myaccent7 hover:to-myaccent7 text-base text-white font-medium font-mynormal"
        >
          Summerize
        </Button>
      </div>
    </main>
  );
}
