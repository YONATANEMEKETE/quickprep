import { redirect } from 'next/navigation';
import React from 'react';

const Summery = () => {
  redirect('/');

  return <div className="min-h-[70vh]">Summery</div>;
};

export default Summery;
