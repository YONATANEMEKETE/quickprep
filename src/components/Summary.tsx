'use client';

import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';
import CopyBtn from './ui/CopyBtn';
import Image from 'next/image';
import errorillustration from '../../public/Man reading-bro.svg';
import { Button } from './ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import useFile from '@/stores/file';
import { useQuery } from '@tanstack/react-query';
import { uploadLocal } from '@/lib/uploadLocal';
import { Skeleton } from './ui/skeleton';

const Summary = ({ path }: { path: string }) => {
  const [displaying, setDisplaying] = useState<string>('note');

  return (
    <div className="w-full pt-12 flex flex-col gap-y-12 items-center">
      <div className="h-10 border bg-gray-100 rounded-md w-[200px] flex items-center justify-between p-1">
        <div
          onClick={() => {
            setDisplaying('note');
          }}
          className={cn(
            'h-8  w-[92px] grid place-content-center rounded-md  text-base text-mytext font-mynormal font-semibold cursor-pointer transition-color duration-100 ',
            displaying === 'note' &&
              'bg-myaccent6 text-white font-medium shadow-md'
          )}
        >
          Note
        </div>
        <div
          onClick={() => {
            setDisplaying('questions');
          }}
          className={cn(
            'h-8  w-[90px] grid place-content-center rounded-md  text-base text-mytext font-mynormal font-semibold cursor-pointer transition-acolor duration-100',
            displaying === 'questions' &&
              'bg-myaccent6 text-white font-medium shadow-md'
          )}
        >
          Questions
        </div>
      </div>
      {displaying === 'note' ? <Note /> : <Note />}
    </div>
  );
};

export default Summary;

const Note = () => {
  const { file } = useFile();
  const {
    data: note,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['file', file],
    queryFn: async () => {
      const data = await uploadLocal(file!);
      return data;
    },
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
  });

  const router = useRouter();

  if (isError) {
    toast.error('Error generating Note', {
      action: {
        label: 'Return to Home',
        onClick: () => {
          router.push('/');
        },
      },
    });

    return (
      <div className=" grid place-content-center space-y-2">
        <Image
          src={errorillustration}
          alt="image of a man reading a book"
          className="size-[300px]"
        />
        <p className="text-base md:text-lg text-mytextlight font-mynormal font-semibold">
          Oops! it seems like Something went wrong.
        </p>
        <Link href={'/'} className="w-full">
          <Button
            variant={'ringHover'}
            className="text-base text-white font-main font-semibold w-full"
          >
            Return to Home
          </Button>
        </Link>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="w-full space-y-6 px-6">
        <Skeleton className="h-6 w-56 rounded-md" />
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <Markdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
        className={
          'markdown text-sm sm:text-base text-mytextlight font-main font-medium leading-loose px-6 md:px-0'
        }
      >
        {note?.text}
      </Markdown>
      {note && <CopyBtn content={note.text} />}
    </div>
  );
};

// const Questions = ({ message }: StreamProps) => {
//   const { complete, completion, isLoading, error } = useCompletion({
//     api: '/api/questions',
//     onFinish(prompt, completion) {
//       changeQuestions(completion);
//       deleteLocal(prompt);
//     },
//     onError(error) {
//       toast.error('Error generating questions', {
//         action: {
//           label: 'Return to Home',
//           onClick: () => {
//             router.push('/');
//           },
//         },
//       });
//     },
//   });
//   const { changeQuestions } = useStream();
//   const router = useRouter();

//   useEffect(() => {
//     !message && complete('');
//   }, []);

//   if (error) {
//     return (
//       <div className="grid place-content-center space-y-2">
//         <Image
//           src={errorillustration}
//           alt="image of a man reading a book"
//           className="size-[300px]"
//         />
//         <p className="text-base md:text-lg text-mytextlight font-mynormal font-semibold">
//           Oops! it seems like Something went wrong.
//         </p>
//         <Link href={'/'} className="w-full">
//           <Button
//             variant={'ringHover'}
//             className="text-base text-white font-main font-semibold w-full"
//           >
//             Return to Home
//           </Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4 w-full">
//       {isLoading && (
//         <div className="flex items-center gap-x-2 ml-6 md:m-0">
//           <Loader2 className="animate-spin" />
//           <p className="text-sm text-mytextlight font-mynormal font-semibold">
//             Generating Questions
//           </p>
//         </div>
//       )}
//       <Markdown
//         remarkPlugins={[remarkMath]}
//         rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
//         className={
//           'markdown text-sm sm:text-base text-mytextlight font-main font-medium leading-loose px-6 md:px-0'
//         }
//       >
//         {message || completion}
//       </Markdown>

//       {message && <CopyBtn content={message} />}
//     </div>
//   );
// };
