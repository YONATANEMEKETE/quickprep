import React from 'react';

const BgShapeOne = () => {
  return (
    <div className="absolute -z-10 size-[600px] rounded-br-full opacity-10 -left-28 -top-28 bg-myaccent3 filter blur-3xl"></div>
  );
};

const BgShapeTwo = () => {
  return (
    <div className="absolute -z-10 size-[250px] border top-1/2 -translate-y-1/2 left-1/2  rounded-full opacity-40 bg-myaccent3 filter blur-2xl"></div>
  );
};

export { BgShapeOne, BgShapeTwo };
