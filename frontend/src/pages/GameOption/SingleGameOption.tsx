import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { userApis } from '../../hooks/api/userApis';
import {
  TempLocationStateGameInfo,
  UserIpAtom,
  ActiveCarouselNumAtom,
} from '../../atoms/atoms';
import { SelectLevelBtn, SelectYearBtn } from '../../components/features';
import { ReactComponent as StartIcon } from '../../assets/svgs/startBtn.svg';
import { Logo, BackBtn, Modal } from '../../components/utils';
import * as S from './GameOption.styled';

const EASYTIME = 3000;
const NORMALTIME = 2000;
const HARDTIME = 1000;
const CRAZYTIME = 500;
const optionList = ['난이도 선택', '연도 선택', '선택한 연도'];
const levelLists = [
  { title: 'easy', select: false, time: EASYTIME },
  { title: 'normal', select: false, time: NORMALTIME },
  { title: 'hard', select: false, time: HARDTIME },
  { title: 'crazy', select: false, time: CRAZYTIME },
];

export const SingleGameOption = () => {
  const [activeCarouselNum, setActiveCarouselNum] = useRecoilState(
    ActiveCarouselNumAtom
  );
  const [locationState, setLocationState] = useRecoilState(
    TempLocationStateGameInfo
  );
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick?: () => void | null;
    yesBtnClick?: () => void | null;
  }>({ data: { title: '', message: '' } });
  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle

  const navigate = useNavigate();
  const location = useLocation();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [levelList, setLevelList] = useState<{
    title: string;
    select: boolean;
    time: number;
  }>({ title: 'easy', select: false, time: EASYTIME });

  // 모바일 기기 접근을 막기 위해 추가한 코드
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      navigate('/mobile-restriction');
    }

    setActiveCarouselNum({ activeCarouselNum: 1 });
  }, []);

  // 결과창에서 다시하기 버튼 클릭 시 옵션 그대로 가져오기 위해 작성한 코드
  useEffect(() => {
    if (location.state) {
      // location.state 있을 경우에만 실행. RetryButton 컴포넌트에서 전달된 state 객체
      const { mode, selectYear } = location.state; // location.state 객체에서 mode와 selectYear 추출
      setCheckedList(selectYear); //

      const timeMapping = {
        easy: EASYTIME,
        normal: NORMALTIME,
        hard: HARDTIME,
        crazy: CRAZYTIME,
      };

      setLevelList({
        // 난이도에 따라 동적으로 time 할당
        title: mode,
        select: true,
        time: timeMapping[mode as 'easy' | 'normal' | 'hard' | 'crazy'],
      });
    }
  }, []);

  // eslint-disable-next-line no-shadow
  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);

      return;
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    }
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  const handleClickRadioButton = (e: any) => {
    let tempTime;
    if (e.target.value === 'easy') {
      tempTime = EASYTIME;
    } else if (e.target.value === 'normal') {
      tempTime = NORMALTIME;
    } else if (e.target.value === 'hard') {
      tempTime = HARDTIME;
    } else {
      tempTime = CRAZYTIME;
    }
    setLevelList({ title: e.target.value, select: true, time: tempTime });
  };

  // 옵션 선택한거 play 페이지로 location.state로 넘겨주기
  const sendOptionToGamePlayPage = async () => {
    if (checkedList.length === 0) {
      alert('연도를 선택해주세요');
      return;
    }

    await userApis
      .post(
        `${
          process.env.REACT_APP_BASE_URL
        }/music/single/room?difficulty=${levelList.title.toUpperCase()}&year=${checkedList.join(
          ' '
        )}`
      )
      .then((res) => {
        const selectOptionList = {
          checkDifficulty: levelList,
          yearCheckedList: checkedList,
          gameRoomData: res.data.data,
        };
        setLocationState({
          difficulty: levelList,
          yearList: checkedList,
          gameRoomData: res.data.data,
        });
        navigate('/single/game-playing', { state: selectOptionList });
      })
      .catch((err) => {
        setIsToggled(true);
        setModalData({
          data: {
            title: '😥',
            message: '게임 방 만들기에 실패했어요',
          },
          yesBtnClick: () => {
            setIsToggled(false);
          },
        });
      });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        sendOptionToGamePlayPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sendOptionToGamePlayPage]);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Modal {...modalData} isToggled={isToggled} setIsToggled={setIsToggled} />
      <S.Wrapper>
        <BackBtn url="/select-mode" />
        <S.Container>
          <Logo size="sm" />
          <S.OptionContainer>
            <S.TitleContainer>
              <ul>
                {optionList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </S.TitleContainer>
            <S.ContentContainer>
              <SelectLevelBtn
                levelLists={levelLists}
                handleClickRadioButton={handleClickRadioButton}
                levelList={levelList}
              />
              <SelectYearBtn
                checkedList={checkedList}
                setCheckedList={setCheckedList}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                checkedItemHandler={checkedItemHandler}
                checkHandler={checkHandler}
              />
            </S.ContentContainer>
          </S.OptionContainer>
          <StartIcon
            width={180}
            height={60}
            onClick={sendOptionToGamePlayPage}
            className="startIcon"
          />
        </S.Container>
      </S.Wrapper>
    </motion.div>
  );
};
