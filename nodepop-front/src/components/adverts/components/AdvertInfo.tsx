import React from 'react';

import Wrapper from '../styles/AdvertInfoWrapper';

interface AdvertInforProps {
  icon: React.ReactNode;
  text: string;
}

const AdvertInfo = ({ icon, text }: AdvertInforProps) => {
  return (
    <Wrapper>
      <span className="advert-icon">{icon}</span>
      <span className="advert-text">{text}</span>
    </Wrapper>
  );
};

export default AdvertInfo;
