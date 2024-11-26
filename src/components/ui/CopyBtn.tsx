'use client';

import React, { useState } from 'react';
import { Button } from './button';
import { Check, Copy } from 'lucide-react';
import Link from 'next/link';

const CopyBtn = ({ content }: { content: any }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyChange = () => {
    setCopied(!copied);
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={() => handleCopyChange}
        variant={'outline'}
        size={'icon'}
        className="hover:bg-myaccent05 text-mytextlight"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </Button>
      <Link href={'/'}>
        <Button
          variant={'gooeyLeft'}
          className="bg-gradient-to-br from-myaccent5 to-myaccent7 text-sm text-white font-mynormal font-medium px-8"
        >
          New
        </Button>
      </Link>
    </div>
  );
};

export default CopyBtn;
