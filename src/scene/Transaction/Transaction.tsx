import "./Transaction.scss";
import { useEffect, useState } from "react";
import { deleteTransactions, getTransactions, updateTransactions } from "@/api/transactions";
import { Transaction, emptyTransaction } from "@/types/Transaction";
import { PaginationType } from "@/types/ApiData";
import { Header } from "@/components/Header";
import AddTransactionForm from "./AddTransactionForm";
import Modal from "@/components/Modal";
import { TablePropsType } from "@/types/Table";
import { isDataChanged } from "@/utils/helpers";
import { tableColumns } from "./TableColumns";
import Table from "@/components/Table";
import { getAllUsers } from "@/api/users";
import { getAllBooks } from "@/api/books";

const Transactions = () => {
  const [allBooks, setAllBooks] = useState<string[]>([]);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 1,
  });
  const [currentLoadedPage, setCurrentLoadedPage] = useState(1);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<Transaction>(emptyTransaction);
  const [dataMatch, setMatch] = useState<Transaction>(emptyTransaction);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchAllBooks = async () => {
    const allBooksData = await getAllBooks();
    setAllBooks(allBooksData.data.map(obj => obj.name));
  }

  const fetchAllUsers = async () => {
    const allUsersData = await getAllUsers();
    setAllUsers(allUsersData.data.map(obj => obj.user_name));
  }  

  const handleDelete = async (id: string) => {
    setUpdateLoading(true);
    if (confirm("Are you sure to delete?")) {
      const result = await deleteTransactions(id);
      if (result.message.includes("Please log in")) {
        window.location.reload();
        return;
      }
      update(id);
      alert(result.message);
    }
    setUpdateLoading(false);
  }

  const handleEdit = async () => {
    setUpdateLoading(true);
    if (dataUpdate.id) {
      if (isDataChanged(Object.values(dataUpdate), Object.values(dataMatch))) {
          const { id, ...restData } = dataUpdate;
          const result = await updateTransactions(id, restData);
          if (result.message.includes("Please log in")) {
            window.location.reload();
            return;
          }
          update(id, result.data);
          alert(result.message);
        }
    }
    disableEdit();
    setUpdateLoading(false);
  }

  const enableEdit = (id: string) => {
    const data = transactions.find(data => data.id === id)!;
    setDataUpdate(data);
    setMatch(data);
  }

  const disableEdit = () => {
    setDataUpdate(emptyTransaction);
    setMatch(emptyTransaction);
  }

  const onChange = (key: string, value: string) => {
    setDataUpdate(state => {
       return {
        ...state,
        [key]: value,
      }
    })
  }

  const fetchTransactions = async () => {
    setFetchLoading(true);
    const result = await getTransactions(`?sortBy=createdAt:desc&page=${pagination.page}`);
    if (!result.success) {
      if (result.message.includes("Please log in")) {
        window.location.reload();
      } else {
        alert(result.message);
      }
      return;
    }
    const { results, ...paginationRest } = result.data;
    setPagination(paginationRest);
    setTransactions(state => {
      const arrayData = [ ...state, ...results, ];
      return arrayData.filter((item, index) => arrayData.indexOf(arrayData.find(data => data.id === item.id)!) === index);
    });
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

  const paginatedData = transactions?.slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit);

  const update = (id?: string, newData?: Transaction) => {
    setTransactions(state => {
      if (id && newData) {
        return [...state].map(data => {
          if (id === data.id) {
            return newData;
          }
          return data;
        });
      }

      if (!id && newData) {
        return [ newData, ...state ];
      }

      if (id && !newData) {
        return [...state].filter(data => data.id !== id);
      }

      return state;
    });

    setPagination(state => {
      if (!id && newData) {
        return {
          ...state,
          page: 1,
          totalResults: state.totalResults + 1,
        };
      }

      if (id && !newData) {
        const pageCountOnRemove = Math.ceil((state.totalResults - 1) / state.limit);
        return {
          ...state,
          page: pageCountOnRemove < state.page ? pageCountOnRemove : state.page,
          totalResults: state.totalResults - 1,
        };
      }
      setCurrentLoadedPage(1);
      
      return state;
    });
  }

  useEffect(() => {
    if (pagination.page > currentLoadedPage) {
      fetchTransactions();
      setCurrentLoadedPage(pagination.page);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  useEffect(() => {
    fetchTransactions();
    fetchAllBooks();
    fetchAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsProps = {
    enableEdit,
    disableEdit,
    handleDelete,
    updateLoading,
    onChange,
    handleEdit,
    dataUpdate,
    tableColumns,
    allBooks,
    allUsers,
  }

  const paginationProps = {
    pagination,
    handlePageChange,
    fetchLoading,
    paginatedData,
  }

  const tableData: TablePropsType<Transaction> = {
    columnsProps,
    paginationProps,
  }

  return (
    <>
      <Header setIsOpenModal={setIsOpenModal} name="Transaction" />
      <Table {...tableData} />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} title="Add Transaction" isLoading={formLoading}>
        <AddTransactionForm setModal={setIsOpenModal} update={update} setFormLoading={setFormLoading}/>
      </Modal>
    </>
  );
}

export default Transactions;