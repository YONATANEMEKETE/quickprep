'use client';

import React, { useState } from 'react';
import { Button } from './button';
import { Check, Copy } from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipProvider, TooltipTrigger } from './tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';

const CopyBtn = ({ content }: { content: any }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyChange = () => {
    setCopied(true);

    window.navigator.clipboard.writeText(content);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center gap-x-2 ml-6 md:m-0">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleCopyChange}
              variant={'outline'}
              size={'icon'}
              className="hover:bg-myaccent05 text-mytextlight"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={6}
            className="border shadow-lg px-2 py-1 rounded-md bg-myaccent05 text-sm text-mytextlight font-main font-medium"
          >
            Copy response
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Link href={'/'}>
        <Button
          variant={'gooeyLeft'}
          className="bg-gradient-to-br from-myaccent5 to-myaccent7 text-sm text-white font-mynormal font-medium px-8"
        >
          Return
        </Button>
      </Link>
    </div>
  );
};

export default CopyBtn;
