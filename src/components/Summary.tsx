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
    <div className="w-full pt-12">
      <Button className="mb-6" onClick={() => complete(`Three.js`)}>
        Generate
      </Button>

      <div>{completion}</div>
    </div>
  );
};

export default Summary;
