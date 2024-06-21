import { useState, useEffect } from 'react';
import axios from 'axios';

import { Board } from '../../components/utils/Board';
import * as S from './AdminReportPage.styled';
import { dataSource } from './mockData';

type AdminBoardPost = {
  nickname: string;
  date: string;
  content: string;
};

export const AdminReportPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [posts, setPosts] = useState<AdminBoardPost[]>([]);
  const [totalBoardCnt, setTotalBoardCnt] = useState(0);

  const fetchList = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin/no-access-anybody/report?page=${currentPage}&size=${pageSize}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <S.Container>
      <Board
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        posts={dataSource}
        loading={loading}
      />
      <button
        type="button"
        onClick={() => {
          fetchList();
        }}
      >
        조회
      </button>
    </S.Container>
  );
};
