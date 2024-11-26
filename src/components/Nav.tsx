import React from 'react';
import Container from './ui/Container';
import Image from 'next/image';
import quickpreplogo from '../../public/logoquickprep.png';
import Link from 'next/link';
import { Button } from './ui/button';
import { SiGithub } from 'react-icons/si';
import { GithubIcon, LinkedinIcon } from './ui/Links';

const Nav = () => {
  return (
    <div className=" fixed top-0 w-full z-50 bg-myaccent05 bg-opacity-80">
      <Container className="h-20 flex items-center justify-between">
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
    </div>
  );
};

export default Nav;
