'use client';

import React from 'react';
import { Button } from './ui/button';
import { useCompletion } from 'ai/react';

const Summary = ({ path }: { path: string }) => {
  const { complete, completion } = useCompletion({
    api: '/api/note',
    // experimental_throttle: 1000,
  });

  return (
    <div className="max-w-[600px]">
      <Button onClick={() => complete(`${path}`)}>Generate</Button>
      <div>{completion}</div>
    </div>
  );
};

export default Summary;
