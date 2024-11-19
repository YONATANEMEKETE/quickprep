import React from 'react';
import Container from './ui/Container';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <Container className="flex flex-col items-center justify-center pt-6 gap-y-2">
      <div className="flex items-center">
        <p className="text-xs text-myaccent5 opacity-70 font-mynormal font-semibold cursor-pointer">
          Made With Love ❤ by
        </p>
        <a
          href="https://t.me/yonatanemekete"
          target="_blank"
          className="text-xs text-myaccent5 opacity-90 font-mynormal font-semibold cursor-pointer"
        >
          <Button variant={'linkHover1'}>Yonatane.M</Button>
        </a>
      </div>

      <div className="flex items-center justify-center gap-x-5">
        <a href="https://www.linkedin.com/in/yonatanemekete" target="_blank">
          <Button
            variant={'linkHover2'}
            className="text-sm text-mytextlight font-mynormal font-semibold"
          >
            LinkedIn
          </Button>
        </a>
        <a href="https://github.com/YONATANEMEKETE" target="_blank">
          <Button
            variant={'linkHover2'}
            className="text-sm text-mytextlight font-mynormal font-semibold"
          >
            Github
          </Button>
        </a>
        <a href="https://x.com/MeketeYona82296" target="_blank">
          <Button
            variant={'linkHover2'}
            className="text-sm text-mytextlight font-mynormal font-semibold"
          >
            X
          </Button>
        </a>
        <a href="https://t.me/yonatanemekete" target="_blank">
          <Button
            variant={'linkHover2'}
            className="text-sm text-mytextlight font-mynormal font-semibold"
          >
            Telegram
          </Button>
        </a>
      </div>
    </Container>
  );
};

export default Footer;
