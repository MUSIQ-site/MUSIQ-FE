import React from 'react';
import { ReactComponent as LogoIcon } from '../../../assets/svgs/logo.svg';

type OwnProps = {
  size: 'sm' | 'lg';
};

export const Logo = (props: OwnProps) => {
  const { size } = props;

  return <LogoIcon width={size === 'sm' ? 200 : 400} />;
};
