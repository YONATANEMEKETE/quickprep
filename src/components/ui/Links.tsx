import Image from 'next/image';
import githublogo from '../../../public/github-142-svgrepo-com.svg';
import linkedinlogo from '../../../public/icons8-linkedin.svg';

export function LinkedinIcon() {
  return (
    <Image src={linkedinlogo} alt="Github icon" className="size-4 sm:size-5" />
  );
}

export function GithubIcon() {
  return (
    <Image src={githublogo} alt="Github icon" className="size-4 sm:size-5" />
  );
}
