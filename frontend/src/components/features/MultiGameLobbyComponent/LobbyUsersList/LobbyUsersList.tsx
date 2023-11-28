import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { userApis } from '../../../../hooks/api/userApis';
import {
  UsersListWrapper,
  UserCellWrapper,
  UserCell,
  ConnectedUserText,
} from './LobbyUsersList.styled';

type UserType = {
  nickname: string;
  userLevel: number;
  isGaming: boolean;
};

interface LobbyUsersListProps {
  refreshKey: number; // 새로 추가된 prop
}

export const LobbyUsersList: React.FC<LobbyUsersListProps> = ({
  refreshKey,
}) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const location = useLocation();
  const myNickname = window.localStorage.getItem('nickname');
  const accessToken = window.localStorage.getItem('userAccessToken');
  const channelNumber = location.pathname.split('/').slice(-2)[0];

  const fetchUsers = async () => {
    try {
      setUsers([]); // 새로운 데이터를 로드하기 전에 기존 목록을 초기화

      const response = await userApis.get(
        `${process.env.REACT_APP_BASE_URL}/game/${channelNumber}`
      );

      if (response.data.code === 200) {
        const sortedUsers = response.data.data.channelUserResponseItems.sort(
          (a: UserType, b: UserType) => b.userLevel - a.userLevel
        );
        setUsers(sortedUsers);
      }
    } catch (error) {
      console.error('Fetching users failed: ', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshKey]); // refreshKey에 의존하도록 변경

  return (
    <UsersListWrapper>
      <ConnectedUserText>접속중인 유저</ConnectedUserText>
      <UserCellWrapper>
        {users.map((user) => (
          <UserCell key={user.nickname}>
          {user.nickname} {user.userLevel}Lv&nbsp; 
          <span style={{ color: user.isGaming ? 'red' : 'green', fontSize: '10px' }}>
            {user.isGaming ? '게임중' : '로비'}
          </span>
        </UserCell>
        ))}
      </UserCellWrapper>
    </UsersListWrapper>
  );
};
