'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid place-content-center min-h-[50vh]">
      <h2 className="text-lg text-mytextlight font-mynormal font-semibold">
        Something went wrong!
      </h2>
      <Button
        variant={'ringHover'}
        className="text-base text-white font-mynormal font-semibold w-full"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
