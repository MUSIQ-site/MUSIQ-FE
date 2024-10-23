import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { userApis } from '../../../../hooks/api/userApis';
import { LoadingSpinner } from '../../../utils';
import * as S from './MultiGameOptionChangeModal.styled';
import cancleBtnIcon from '../../../../assets/img/Mutli/wrongBtn.png';

type GameRoomInfo = {
  title: string;
  musicYear: string[];
  quizAmount: number;
  maxUserNumber: number;
};

type OwnProps = {
  isGameOptionChange: boolean;
  setIsGameOptionChange: React.Dispatch<React.SetStateAction<boolean>>;
  gameRoomInfo: GameRoomInfo;
  multiModeCreateGameRoomLogId: number;
  currentUserNumber: number;
};

const yearsOptions = [
  '1970',
  '1980',
  '1990',
  '2000',
  '2010',
  '2015',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
];

const quizAmountList = [3, 10, 20, 30];

export const MultiGameOptionChangeModal = (props: OwnProps) => {
  const {
    isGameOptionChange,
    setIsGameOptionChange,
    multiModeCreateGameRoomLogId,
    currentUserNumber,
  } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const { title, musicYear, quizAmount, maxUserNumber } = props.gameRoomInfo;
  const location = useLocation();

  // 옵션 변경 버튼을 눌렀을때 로딩스피너
  const [loading, setLoading] = useState<boolean>(false);
  // 제목, 연도, 퀴즈갯수, 최대유저 수 관리를 위한 상태
  const [newTitle, setNewTitle] = useState<string>(title);
  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [newYear, setNewYear] = useState<string[]>(musicYear);
  const [newQuizAmount, setNewQuizAmount] = useState<number>(quizAmount);
  const [newMaxUserNumber, setnewMaxUserNumber] =
    useState<number>(maxUserNumber);

  // 취소 버튼 이벤트핸들러
  const handleCancelBtnClick = () => {
    setLoading(false);
    setIsGameOptionChange(false);
    setNewTitle(title);
    setNewYear(musicYear);
    setNewQuizAmount(quizAmount);
    setnewMaxUserNumber(maxUserNumber);
  };

  // 게임 옵션 변경사항 적용 버튼 이벤트 핸들러
  const handleUpdateBtnClick = async () => {
    if (newTitle.trim() === '') {
      alert('방 제목을 입력해주세요.');
      return;
    }

    if (newYear.length === 0) {
      alert('연도를 선택해주세요.');
      return;
    }

    if (newQuizAmount === 0) {
      alert('문제 개수를 선택해주세요.');
      return;
    }

    setLoading(true);
    const payload = {
      multiModeCreateGameRoomLogId,
      gameRoomNo: Number(location.pathname.split('/')[4]),
      title: newTitle,
      year: newYear.join(' '),
      quizAmount: newQuizAmount,
      maxUserNumber: newMaxUserNumber,
    };
    await userApis
      .patch(`${process.env.REACT_APP_BASE_URL}/game/main/modify`, payload)
      .then((res) => {
        setLoading(false);
        setIsGameOptionChange(false);
        alert('게임 방 정보 변경에 성공하였습니다');
      })
      .catch((err) => {
        setLoading(false);
        alert('정보 변경에 실패하였습니다');
      });
  };

  // 연도 선택 핸들러
  const handleYearUpdateOnChange = (year: string) => {
    setNewYear((prevYears) => {
      if (prevYears.includes(year)) {
        // 이미 연도가 선택되어 있다면 제거
        return prevYears.filter((y) => y !== year);
      }
      // 연도가 선택되어 있지 않다면 추가
      return [...prevYears, year];
    });
  };

  // 문제 개수 선택 핸들러
  const handleQuizAmountChange = (amount: number) => {
    setNewQuizAmount(amount);
  };

  useEffect(() => {
    setLoading(false);
    setNewTitle(title);
    setNewYear(musicYear);
    setNewQuizAmount(quizAmount);
    setnewMaxUserNumber(maxUserNumber);
  }, [maxUserNumber]);

  return (
    <div>
      {isGameOptionChange && (
        <S.GreyBackground>
          <S.ModalContainer
            initial={{ y: 10, x: '-50%', opacity: 0 }}
            animate={{ y: 50, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <S.ModalContent>
              <h1>게임 옵션 변경</h1>
              {loading ? (
                <div className="loadingContainer">
                  <LoadingSpinner />
                  <div className="loadingSppinerText">
                    <p>게임 옵션 정보를 변경중입니다...</p>
                    <p>잠시만 기다려주세요</p>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="cancelBtn"
                    onClick={handleCancelBtnClick}
                  >
                    <img src={cancleBtnIcon} alt="닫기" width={25} />
                  </button>
                  {/* 방 제목 변경 input */}
                  <S.TitleChangeStyle>
                    <input
                      type="text"
                      value={newTitle}
                      placeholder="방 제목을 입력하세요"
                      className="roomTitleStyle"
                      onChange={(e) => {
                        const currentTitle = e.target.value;
                        if (currentTitle.length <= 18) {
                          setNewTitle(currentTitle);
                          setErrorTitle(false);
                        } else {
                          setErrorTitle(true);
                        }
                      }}
                      autoComplete="off"
                      maxLength={18}
                    />
                    {errorTitle && (
                      <p className="errorTitle">
                        방 제목은 최대 18글자 까지 입니다
                      </p>
                    )}
                  </S.TitleChangeStyle>
                  {/* 연도 선택 변경 input */}
                  <S.YearListStyle>
                    <h2>노래 연도 선택</h2>
                    <div className="yearList">
                      {yearsOptions.map((year) => (
                        <label htmlFor={year} key={year}>
                          <input
                            type="checkbox"
                            value={year}
                            id={year}
                            checked={newYear.includes(year)}
                            onChange={(e) => {
                              handleYearUpdateOnChange(e.target.value);
                            }}
                          />
                          {year}
                        </label>
                      ))}
                    </div>
                  </S.YearListStyle>
                  <S.QuizAmountMaxUserContainer>
                    {/* 문제 개수 선택 변경 input */}
                    <S.QuizAmountStyle>
                      <h2>퀴즈 개수 선택</h2>
                      {quizAmountList.map((amount) => (
                        <label key={amount}>
                          <input
                            type="radio"
                            value={amount}
                            checked={newQuizAmount === amount}
                            onChange={() => {
                              handleQuizAmountChange(amount);
                            }}
                          />
                          {amount}
                        </label>
                      ))}
                    </S.QuizAmountStyle>
                    <div className="whiteLine" />
                    {/* 최대 인원 수 변경 input */}
                    <S.MaxUserNumberInputStyle>
                      <h2>최대 인원 수</h2>
                      <input
                        type="number"
                        value={newMaxUserNumber}
                        className="maxUserNumberInput"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setnewMaxUserNumber((prev: number) => {
                            if (prev + 1 > 10) {
                              alert('게임 방 최대 인원은 10명입니다.');
                              return prev;
                            }
                            return prev + 1;
                          });
                        }}
                      >
                        🔼
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setnewMaxUserNumber((prev: number) => {
                            // 현재 게임 방 인원보다 작으면 alert 띄우기
                            if (prev - 1 < currentUserNumber) {
                              alert(
                                '현재 방 인원보다 적은 수로 변경 불가능합니다.'
                              );
                              return prev;
                            }
                            if (prev - 1 < 1) {
                              alert('게임 방 최소 인원은 1명입니다.');
                              return prev;
                            }
                            return prev - 1;
                          });
                        }}
                      >
                        🔽
                      </button>
                    </S.MaxUserNumberInputStyle>
                  </S.QuizAmountMaxUserContainer>
                  <S.UpdateBtnStyle onClick={handleUpdateBtnClick}>
                    적용
                  </S.UpdateBtnStyle>
                </>
              )}
            </S.ModalContent>
          </S.ModalContainer>
        </S.GreyBackground>
      )}
    </div>
  );
};
