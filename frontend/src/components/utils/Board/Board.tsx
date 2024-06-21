import { Table, Pagination, Spin } from 'antd';
import { Dispatch, SetStateAction } from 'react';

const columns = [
  {
    title: '닉네임',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '날짜',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '내용',
    dataIndex: 'content',
    key: 'content',
  },
];

type AdminBoardPost = {
  nickname: string;
  date: string;
  content: string;
};

type Props = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  posts: AdminBoardPost[];
  loading: boolean;
};

export const Board = ({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  posts,
  loading
}: Props) => {
  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const paginatedData = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const locale = {
    emptyText: "조회결과가 없습니다."
  }

  return (
    <div>
      <Table
        dataSource={paginatedData}
        rowKey={(row, idx) => idx}
        columns={columns}
        pagination={false}
        locale={locale}
        loading={
          loading ? {
            indicator: (<div><Spin/></div>)
          }
        }
        pagination={{pageSize: pageSize, hideOnSinglePage: true, showSizeChanger: false}}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={posts.length}
        onChange={handlePageChange}
        showSizeChanger
      />
    </div>
  );
};
