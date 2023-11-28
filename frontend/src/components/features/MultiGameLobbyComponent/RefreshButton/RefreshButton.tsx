import React, { useState } from 'react';
import refreshIcon from '../../../../assets/svgs/MultiLobby/refreshButton.svg';
import hoverIcon from '../../../../assets/svgs/MultiLobby/hoverRefreshButton.svg';
import { StyledRefreshButton, RefreshImg } from './RefreshButton.styled';

interface RefreshButtonProps {
  onClick: () => void;
}

export const RefreshButton = ({ onClick }: RefreshButtonProps) => {
  const [hover, setHover] = useState(false);

  return (
    <StyledRefreshButton
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <RefreshImg
        src={hover ? hoverIcon : refreshIcon}
        alt="refresh button"
        width={160}
      />
    </StyledRefreshButton>
  );
};
