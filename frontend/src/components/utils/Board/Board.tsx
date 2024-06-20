import { Table, Pagination } from 'antd';
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
};

export const Board = ({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  posts,
}: Props) => {
  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const paginatedData = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <Table dataSource={paginatedData} columns={columns} pagination={false} />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={posts.length}
        onChange={handlePageChange}
        showSizeChanger
        onShowSizeChange={handlePageChange}
        pageSizeOptions={['10', '30', '50']}
      />
    </div>
  );
};
