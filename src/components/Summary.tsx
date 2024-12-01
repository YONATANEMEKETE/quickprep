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
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import useFile from '@/stores/file';
import { useQuery } from '@tanstack/react-query';
import { uploadNote } from '@/lib/uploadNote';
import { Skeleton } from './ui/skeleton';
import { uploadQuestions } from '@/lib/uploadQuestions';
import { motion } from 'framer-motion';

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
            'relative h-8  w-[92px] grid place-content-center rounded-md  text-base text-mytext font-mynormal font-semibold cursor-pointer transition-color duration-300',
            displaying === 'note' && ' text-white font-medium'
          )}
        >
          {displaying === 'note' && (
            <motion.div
              layoutId="background"
              className="absolute inset-0 rounded-md bg-myaccent6 z-0"
            ></motion.div>
          )}
          <p className="relative">Note</p>
        </div>
        <div
          onClick={() => {
            setDisplaying('questions');
          }}
          className={cn(
            'relative h-8  w-[90px] grid place-content-center rounded-md  text-base text-mytext font-mynormal font-semibold cursor-pointer transition-acolor duration-300',
            displaying === 'questions' && ' text-white font-medium'
          )}
        >
          {displaying === 'questions' && (
            <motion.div
              layoutId="background"
              className="absolute inset-0 rounded-md bg-myaccent6 z-0"
            ></motion.div>
          )}
          <p className="relative">Questions</p>
        </div>
      </div>
      {/* {displaying === 'note' ? <Note /> : <Questions />} */}
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
    queryKey: ['note', file],
    queryFn: async () => {
      const data = await uploadNote(file!);
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

const Questions = () => {
  const { file } = useFile();
  const {
    data: questions,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['questions', file],
    queryFn: async () => {
      const data = await uploadQuestions(file!);
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
        {questions?.text}
      </Markdown>
      {questions && <CopyBtn content={questions.text} />}
    </div>
  );
};
