/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { userApis } from '../../hooks/api/userApis';
import { ActiveCarouselNumAtom } from '../../atoms/atoms';
import { ChannelComponent } from '../../components/features';
import { BackBtn, Modal } from '../../components/utils';
import { ChannelWrapper, CenteredContainer } from './MultiChannelPage.styled';
import channelIcon from '../../assets/svgs/channelSelectionLogo.svg';

export const MultiChannelPage = () => {
  const [activeCarouselNum, setActiveCarouselNum] = useRecoilState(
    ActiveCarouselNumAtom
  );
  const navigate = useNavigate();
  const [channelSizes, setChannelSizes] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle

  useEffect(() => {
    // 모바일 기기 접근을 막기 위해 추가한 코드
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      navigate('/mobile-restriction');
    }
    setActiveCarouselNum({ activeCarouselNum: 2 });
  }, []);

  const handleChannelClick = (channelNumber: number) => {
    if (loading) {
      setIsToggled(true);
    } else {
      navigate(`/multi/${channelNumber}/lobby`);
    }
  };

  const fetchChannelSizes = async () => {
    try {
      const response = await userApis.get(
        `${process.env.REACT_APP_BASE_URL}/game/channel`
      );
      if (response.status === 200) {
        setChannelSizes(response.data.data.channelSizes);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
      console.error('채널리스트 받아오지 못했음', error);
    }
  };

  // 페이지 렌더링 될때 채널 접속자 수 서버에서 계속 받아와서 보여주기
  useEffect(() => {
    setLoading(true);
    fetchChannelSizes();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Modal
        data={{
          title: '😉',
          message:
            '아직 채널에 접속한 유저 정보를 불러오고 있어요 잠시 후 다시 입장해주세요',
        }}
        isToggled={isToggled}
        setIsToggled={setIsToggled}
      />
      <CenteredContainer>
        <BackBtn url="/select-mode" />
        <ChannelWrapper>
          <img src={channelIcon} alt="채널 아이콘" width={300} />
          <ChannelComponent
            channelSizes={channelSizes}
            handleChannelClick={handleChannelClick}
          />
        </ChannelWrapper>
      </CenteredContainer>
    </motion.div>
  );
};
