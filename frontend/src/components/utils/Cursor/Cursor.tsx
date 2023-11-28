import styled from 'styled-components';
import cursorIcon from '../../../assets/img/cursor.png';

const CursorStyle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;

  & :hover {
    cursor: none;
  }
`;

type OwnProps = {
  xy: { x: number; y: number };
};

export const Cursor = (props: OwnProps) => {
  const { xy } = props;

  return (
    <CursorStyle
      style={{
        transform: `translate(${xy.x}px, ${xy.y}px)`,
      }}
    >
      <img src={cursorIcon} alt="손가락커서" width={30} />
    </CursorStyle>
  );
};
