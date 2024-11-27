import React from 'react';
import Container from './ui/Container';
import Image from 'next/image';
import quickpreplogo from '../../public/logoquickprep.png';
import Link from 'next/link';
import { Button } from './ui/button';
import { GithubIcon, LinkedinIcon } from './ui/Links';

const Nav = () => {
  return (
    // <div className="fixed top-0 w-full z-50 bg-white/30 backdrop-filter backdrop-blur-sm">
    <Container className="h-16 px-5 flex items-center justify-between fixed left-1/2 -translate-x-1/2 top-2 w-full z-50 bg-white/50 backdrop-filter backdrop-blur-sm rounded-full shadow-sm shadow-myaccent05">
      <Link href={'/'} className="bg-white rounded-md">
        <Image
          src={quickpreplogo}
          alt="QuickPrep logo"
          className="w-[150px] h-auto cursor-pointer"
        />
      </Link>
      <div className="flex items-center gap-x-2">
        <a href="https://github.com/YONATANEMEKETE/quickprep" target="_blank">
          <Button
            variant={'outline'}
            size={'lg'}
            className="group border-mytextlight bg-transparent hover:bg-myaccent05 px-4 font-mynormal text-mytext rounded-full flex items-center gap-x-2"
          >
            <GithubIcon />
            <p className="text-base group-hover:text-mytextlight">Star</p>
          </Button>
        </a>
        <a href="https://www.linkedin.com/in/yonatanemekete" target="_blank">
          <Button
            variant={'outline'}
            size={'lg'}
            className="group border-mytextlight bg-transparent  hover:bg-myaccent05 px-4 font-mynormal text-mytext rounded-full flex items-center gap-x-2"
          >
            <LinkedinIcon />
            <p className="text-base group-hover:text-mytextlight">Connect</p>
          </Button>
        </a>
      </div>
    </Container>
    // </div>
  );
};

export default Nav;
