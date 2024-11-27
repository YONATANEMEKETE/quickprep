'use client';

import React, { useEffect, useState } from 'react';
import { useCompletion } from 'ai/react';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';
import useStream from '@/stores/streams';
import CopyBtn from './ui/CopyBtn';
import { Skeleton } from './ui/skeleton';

const Summary = ({ path }: { path: string }) => {
  const [displaying, setDisplaying] = useState<string>('note');
  const { note, questions } = useStream();

  return (
    <div className="w-full pt-12 space-y-5">
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
  });
  const { changeNote } = useStream();

  useEffect(() => {
    !message && complete('step by step guide to cook a chicken.');
  }, []);

  if (error) {
    return <div></div>;
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
    <div>
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
  });
  const { changeQuestions } = useStream();

  useEffect(() => {
    !message &&
      complete('Generate a maximum of 10 questions with answer about Git.');
  }, []);

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
    <>
      <Markdown
        className={
          'markdown text-base text-mytextlight font-main font-medium leading-loose'
        }
      >
        {message || completion}
      </Markdown>

      {message && <CopyBtn content={message} />}
    </>
  );
};
