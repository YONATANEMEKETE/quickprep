'use client';

import React from 'react';
import { Button } from './ui/button';
import { useCompletion } from 'ai/react';
import Markdown from 'react-markdown';

const Summary = ({ path }: { path: string }) => {
  const { complete, completion } = useCompletion({
    api: '/api/note',
    // experimental_throttle: 1000,
  });

  return (
    <div className="w-full pt-12">
      <Button
        className="mb-6"
        onClick={() => complete(`tell me the steps of cooking a chicken`)}
      >
        Generate
      </Button>

      <Markdown
        className={
          'markdown text-base text-mytextlight font-main font-medium leading-loose'
        }
      >
        {completion}
      </Markdown>
    </div>
  );
};

export default Summary;
