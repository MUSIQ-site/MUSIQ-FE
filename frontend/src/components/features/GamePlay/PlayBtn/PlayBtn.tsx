import styled from 'styled-components';
import { useState, useEffect, MutableRefObject } from 'react';
import cursorIcon from '../../../../assets/img/cursor.png';
import firstMusicPlayKey from '../../../../assets/img/playgame/firstMusicPlayKey.png';
import middleMusicPlayKey from '../../../../assets/img/playgame/middleMusicPlayKey.png';
import endMusicPlayKey from '../../../../assets/img/playgame/endMusicPlayKey.png';
import clickfirstMusicPlayKey from '../../../../assets/img/playgame/clickfirstMusicPlayKey.png';
import clickmiddleMusicPlayKey from '../../../../assets/img/playgame/clickmiddleMusicPlayKey.png';
import clickendMusicPlayKey from '../../../../assets/img/playgame/clickendMusicPlayKey.png';
import disabledfirstMusicPlayKey from '../../../../assets/img/playgame/disabledfirstMusicPlayKey.png';
import disabledmiddleMusicPlayKey from '../../../../assets/img/playgame/disabledmiddleMusicPlayKey.png';
import disabledendMusicPlayKey from '../../../../assets/img/playgame/disabledendMusicPlayKey.png';

const PlayButtonStyle = styled.button<{ btnname: string; keyEvent: string }>`
  width: 6rem;
  height: 6rem;
  background-image: ${(props) =>
    props.btnname === 'firstMusicPlayKey' ? `url(${firstMusicPlayKey})` : ''};
  background-image: ${(props) =>
    props.btnname === 'middleMusicPlayKey' ? `url(${middleMusicPlayKey})` : ''};
  background-image: ${(props) =>
    props.btnname === 'endMusicPlayKey' ? `url(${endMusicPlayKey})` : ''};
  background-size: contain;
  z-index: 9;

  /* 클릭할때 */
  &:active {
    background-image: ${(props) =>
      props.btnname === 'firstMusicPlayKey'
        ? `url(${clickfirstMusicPlayKey})`
        : ''};
    background-image: ${(props) =>
      props.btnname === 'middleMusicPlayKey'
        ? `url(${clickmiddleMusicPlayKey})`
        : ''};
    background-image: ${(props) =>
      props.btnname === 'endMusicPlayKey'
        ? `url(${clickendMusicPlayKey})`
        : ''};
    background-size: contain;
  }

  /* disabled 상태일때 */
  &.disabled {
    cursor:
      url(${cursorIcon}) 2 2,
      auto !important;
    background-image: ${(props) =>
      props.btnname === 'firstMusicPlayKey'
        ? `url(${disabledfirstMusicPlayKey})`
        : ''};
    background-image: ${(props) =>
      props.btnname === 'middleMusicPlayKey'
        ? `url(${disabledmiddleMusicPlayKey})`
        : ''};
    background-image: ${(props) =>
      props.btnname === 'endMusicPlayKey'
        ? `url(${disabledendMusicPlayKey})`
        : ''};
    background-size: contain;
  }

  /* 키보드이벤트로 조작했을 때 */
  background-image: ${(props) =>
    props.keyEvent === 'ArrowLeft' && props.btnname === 'firstMusicPlayKey'
      ? `url(${clickfirstMusicPlayKey})`
      : ''};
  background-image: ${(props) =>
    props.keyEvent === 'ArrowDown' && props.btnname === 'middleMusicPlayKey'
      ? `url(${clickmiddleMusicPlayKey})`
      : ''};
  background-image: ${(props) =>
    props.keyEvent === 'ArrowRight' && props.btnname === 'endMusicPlayKey'
      ? `url(${clickendMusicPlayKey})`
      : ''};
`;

type OwnProps = {
  btnName: string;
  onClickHandler: (e: any) => void;
  isBtnDisabled: boolean;
  keyEvent: string;
};

export const PlayBtn = (props: OwnProps) => {
  const { btnName, onClickHandler, isBtnDisabled, keyEvent } = props;

  return (
    <PlayButtonStyle
      type="button"
      onClick={onClickHandler}
      disabled={isBtnDisabled}
      btnname={btnName}
      className={isBtnDisabled ? 'disabled' : ''}
      keyEvent={keyEvent}
    />
  );
};
