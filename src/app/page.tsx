import { BgShapeTwo } from '@/components/ui/bg-shapes';
import Dropzone from '@/components/ui/Dropzone';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
export const revalidate = 60;

export default async function Home() {
  // const { text } = await generateText({
  //   model: google('gemini-1.5-flash'),
  //   prompt: 'what is the best way to learn programming',
  // });

  // console.log(text);

  return (
    <main className="relative min-h-[70vh] grid place-content-center">
      <BgShapeTwo />
      <Dropzone />
    </main>
  );
}
