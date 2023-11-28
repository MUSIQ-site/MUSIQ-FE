import styled from 'styled-components';
import skipBtn from '../../../../assets/img/playgame/skipBtn.png';
import clickSkipBtn from '../../../../assets/img/playgame/clickSkipBtn.png';
import disabledSkipBtn from '../../../../assets/img/playgame/disabledSkipBtn.png';

const NoIdeaButtonStyle = styled.button<{ keyEvent: string }>`
  width: 6rem;
  height: 6rem;
  background-image: url(${skipBtn});
  background-image: ${(props) =>
    props.keyEvent === '.' ? `url(${clickSkipBtn})` : `url(${skipBtn})`};
  background-size: contain;

  &:active {
    background-image: url(${clickSkipBtn});
    background-size: contain;
  }

  &.disabled {
    background-image: url(${disabledSkipBtn});
  }
`;

type OwnProps = {
  clickHandler: () => void;
  isBtnDisabled: boolean;
  keyEvent: string;
};

export const SkipBtn = (props: OwnProps) => {
  const { clickHandler, isBtnDisabled, keyEvent } = props;

  return (
    <NoIdeaButtonStyle
      onClick={clickHandler}
      disabled={isBtnDisabled}
      className={isBtnDisabled ? 'disabled' : ''}
      keyEvent={keyEvent}
    />
  );
};
