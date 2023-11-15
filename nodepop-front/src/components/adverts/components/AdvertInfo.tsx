import React from 'react';

import Wrapper from '../styles/AdvertInfoWrapper';

interface AdvertInforProps {
  icon: React.ReactNode;
  text: string;
}

const AdvertInfo = ({ icon, text }: AdvertInforProps) => {
  return (
    <Wrapper>
      <span className="product-icon">{icon}</span>
      <span className="product-text">{text}</span>
    </Wrapper>
  );
};

export default AdvertInfo;
