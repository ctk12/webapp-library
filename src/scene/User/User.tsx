import "./User.scss";
import { useEffect, useState } from "react";
import { PaginationType } from "@/types/ApiData";
import { Header } from "@/components/Header";
import Modal from "@/components/Modal";
import { TablePropsType } from "@/types/Table";
import { isDataChanged } from "@/utils/helpers";
import { tableColumns } from "./TableColumns";
import Table from "@/components/Table";
import { deleteUsers, getUsers, updateUsers } from "@/api/users";
import { User, emptyUser } from "@/types/User";
import AddUserForm from "./AddUserForm";

const Transactions = () => {
  const [users, setUsers] = useState<User[]>([]);
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
  const [dataUpdate, setDataUpdate] = useState<User>(emptyUser);
  const [dataMatch, setMatch] = useState<User>(emptyUser);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setUpdateLoading(true);
    if (confirm("Are you sure to delete?")) {
      const result = await deleteUsers(id);
      if (result.message.includes("Please log in")) {
        window.location.reload();
        return;
      }
      if (result.success) {
        update(id);
      }
      alert(result.message);
    }
    setUpdateLoading(false);
  }

  const handleEdit = async () => {
    setUpdateLoading(true);
    if (dataUpdate.id) {
      if (isDataChanged(Object.values(dataUpdate), Object.values(dataMatch))) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, email, user_name, ...restData } = dataUpdate;
          const result = await updateUsers(id, restData);
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
    const data = users.find(data => data.id === id)!;
    setDataUpdate(data);
    setMatch(data);
  }

  const disableEdit = () => {
    setDataUpdate(emptyUser);
    setMatch(emptyUser);
  }

  const onChange = (key: string, value: string) => {
    setDataUpdate(state => {
       return {
        ...state,
        [key]: value,
      }
    })
  }

  const fetchUsers = async () => {
    setFetchLoading(true);
    const result = await getUsers(`?sortBy=createdAt:desc&page=${pagination.page}&limit=${pagination.limit}`);
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
    setUsers(state => {
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

  const paginatedData = users?.slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit);

  const update = (id?: string, newData?: User) => {
    setUsers(state => {
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
      fetchUsers();
      setCurrentLoadedPage(pagination.page);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  useEffect(() => {
    fetchUsers();
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
    allBooks: [],
    allUsers: [],
  }

  const paginationProps = {
    pagination,
    handlePageChange,
    fetchLoading,
    paginatedData,
  }

  const tableData: TablePropsType<User> = {
    columnsProps,
    paginationProps,
  }

  return (
    <>
      <Header setIsOpenModal={setIsOpenModal} name="User" />
      <Table {...tableData} />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} title="Add User" isLoading={formLoading}>
        <AddUserForm setModal={setIsOpenModal} update={update} setFormLoading={setFormLoading}/>
      </Modal>
    </>
  );
}

export default Transactions;