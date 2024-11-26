'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useCompletion } from 'ai/react';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';

const Summary = ({ path }: { path: string }) => {
  const [displaying, setDisplaying] = useState<string>('note');

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
      {displaying === 'note' ? <Note /> : <Questions />}
    </div>
  );
};

export default Summary;

const Note = () => {
  const { complete, completion } = useCompletion({
    api: '/api/note',
    // experimental_throttle: 1000,
  });

  // useEffect(() => {
  //   complete('step by step guide to cook a chicken.');
  // }, []);

  return (
    <Markdown
      className={
        'markdown text-base text-mytextlight font-main font-medium leading-loose'
      }
    >
      {completion}
    </Markdown>
  );
};

const Questions = () => {
  const { complete, completion } = useCompletion({
    api: '/api/note',
    // experimental_throttle: 1000,
  });

  // useEffect(() => {
  //   complete('step by step guide to learn Git.');
  // }, []);

  return (
    <Markdown
      className={
        'markdown text-base text-mytextlight font-main font-medium leading-loose'
      }
    >
      {completion}
    </Markdown>
  );
};
