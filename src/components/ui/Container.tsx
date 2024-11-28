import { cn } from '@/lib/utils';
import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn('max-w-[1200px]  min-[1200px]:mx-auto', className)}>
      {children}
    </div>
  );
};

export default Container;
