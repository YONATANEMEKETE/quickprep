'use client';

import React, { useEffect, useState } from 'react';
import { useCompletion } from 'ai/react';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';
import useStream from '@/stores/streams';
import CopyBtn from './ui/CopyBtn';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';
import errorillustration from '../../public/Man reading-bro.svg';
import { Button } from './ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Summary = ({ path }: { path: string }) => {
  const [displaying, setDisplaying] = useState<string>('note');
  const { note, questions } = useStream();

  return (
    <div className="w-full pt-12 flex flex-col gap-y-6 items-center">
      <div className="h-10 border rounded-md w-[200px] flex items-center justify-between p-1">
        <div
          onClick={() => {
            setDisplaying('note');
          }}
          className={cn(
            'h-8  w-[92px] grid place-content-center rounded-md  text-base text-mytext font-mynormal font-semibold cursor-pointer transition-color duration-100',
            displaying === 'note' && 'bg-myaccent6 text-white font-medium'
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
            displaying === 'questions' && 'bg-myaccent6 text-white font-medium'
          )}
        >
          Questions
        </div>
      </div>
      {displaying === 'note' ? (
        <Note fileLocation={path} message={note} />
      ) : (
        <Questions fileLocation={path} message={questions} />
      )}
    </div>
  );
};

export default Summary;

type StreamProps = {
  fileLocation: string;
  message: any;
};

const Note = ({ fileLocation, message }: StreamProps) => {
  const { complete, completion, isLoading, error } = useCompletion({
    api: '/api/note',
    onFinish(prompt, completion) {
      changeNote(completion);
    },
    onError(error) {
      toast.error('Error generating note', {
        action: {
          label: 'Return to Home',
          onClick: () => {
            router.push('/');
          },
        },
      });
    },
  });
  const { changeNote } = useStream();
  const router = useRouter();

  useEffect(() => {
    !message && complete('step by step guide to cook a chicken.');
  }, []);

  if (error) {
    return (
      <div className="pt-10 grid place-content-center space-y-2">
        <Image
          src={errorillustration}
          alt="image of a man reading a book"
          className="size-[300px]"
        />
        <p className="text-lg text-mytextlight font-mynormal font-semibold">
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

  if (isLoading) {
    return (
      <div className="space-y-6 pt-6">
        <Skeleton className="h-6 w-[300px] rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-[300px] rounded-md" />
          <Skeleton className="h-6 w-[500px] rounded-md" />
          <Skeleton className="h-6 w-[200px] rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Markdown
        className={
          'markdown text-base text-mytextlight font-main font-medium leading-loose'
        }
      >
        {message || completion}
      </Markdown>
      {message && <CopyBtn content={message} />}
    </div>
  );
};

const Questions = ({ fileLocation, message }: StreamProps) => {
  const { complete, completion, isLoading, error } = useCompletion({
    api: '/api/questions',
    onFinish(prompt, completion) {
      changeQuestions(completion);
    },
    onError(error) {
      toast.error('Error generating questions', {
        action: {
          label: 'Return to Home',
          onClick: () => {
            router.push('/');
          },
        },
      });
    },
  });
  const { changeQuestions } = useStream();
  const router = useRouter();

  useEffect(() => {
    !message &&
      complete('Generate a maximum of 10 questions with answer about Git.');
  }, []);

  if (error) {
    return (
      <div className="pt-10 grid place-content-center space-y-2">
        <Image
          src={errorillustration}
          alt="image of a man reading a book"
          className="size-[300px]"
        />
        <p className="text-lg text-mytextlight font-mynormal font-semibold">
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

  if (isLoading) {
    return (
      <div className="space-y-6 pt-6">
        <Skeleton className="h-6 w-[300px] rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-[300px] rounded-md" />
          <Skeleton className="h-6 w-[500px] rounded-md" />
          <Skeleton className="h-6 w-[200px] rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Markdown
        className={
          'markdown text-base text-mytextlight font-main font-medium leading-loose'
        }
      >
        {message || completion}
      </Markdown>

      {message && <CopyBtn content={message} />}
    </div>
  );
};
