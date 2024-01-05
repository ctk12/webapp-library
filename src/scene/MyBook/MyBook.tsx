import "./MyBook.scss";
import { useEffect, useState } from "react";
import { getMyBooks } from "@/api/books";
import { Book, emptyBook } from "@/types/Book";
import { PaginationType } from "@/types/ApiData";
import { Header } from "@/components/Header";
import { tableColumns } from "./TableColumns";
import Table from "@/components/Table";
import { TablePropsType } from "@/types/Table";

const MyBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 1,
  });
  const [fetchLoading, setFetchLoading] = useState(false);
  const [dataUpdate] = useState<Book>(emptyBook);

  const fetchMyBooks = async () => {
    setFetchLoading(true);
    const result = await getMyBooks();
    if (!result.success) {
      if (result.message.includes("Please log in")) {
        window.location.reload();
      } else {
        alert(result.message);
      }
      return;
    }
    const { data } = result;
    setPagination(state => {
      return {
        ...state,
        totalPages: Math.ceil(data.length / state.limit),
        totalResults: data.length,
      }
    });
    setBooks(data);
    setFetchLoading(false);
  }

  const handlePageChange = (newPage: number) => {
     setPagination(state => {
      return {
        ...state,
        page: newPage,
      }
    });
  };

  const paginatedData = books?.slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit);

  useEffect(() => {
    fetchMyBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsProps = {
    enableEdit: () => {},
    disableEdit: () => {},
    handleDelete: () => {},
    updateLoading: false,
    onChange: () => {},
    handleEdit: () => {},
    dataUpdate,
    tableColumns,
    allBooks: [],
    allUsers: [],
  }

  const paginationProps = {
    pagination,
    handlePageChange,
    fetchLoading,
    paginatedData,
  }

  const tableData: TablePropsType<Book> = {
    columnsProps,
    paginationProps,
  }

  return (
    <>
      <Header setIsOpenModal={() => {}} name="My Book" />
      <Table {...tableData} />
    </>
  );
}

export default MyBooks;