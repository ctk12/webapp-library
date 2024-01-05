import { useEffect, useState } from "react";
import { transactionStatusType } from "@/types/enums";
import { addTransactions } from "@/api/transactions";
import { Transaction } from "@/types/Transaction";
import { getAllBooks } from "@/api/books";
import { getAllUsers } from "@/api/users";
import { InputBasicEl, SelectBasicEl } from "@/components/FormElements";

const AddTransactionForm = ({setModal, update, setFormLoading}: {
    setModal: (value: boolean) => void;
    update: (id?: string, data?: Transaction) => void;
    setFormLoading: (value: boolean) => void;
}) => {
    const [allBooks, setAllBooks] = useState<string[]>([]);
    const [allUsers, setAllUsers] = useState<string[]>([]);
    const [data, setData] = useState<Omit<Transaction, "id">>({
      user_name: "",
      book_name: "",
      due_date: "",
      transaction_type: transactionStatusType.borrowed,
    });

  const fetchAllBooks = async () => {
    const allBooksData = await getAllBooks();
    setAllBooks(allBooksData.data.map(obj => obj.name));
  }

  const fetchAllUsers = async () => {
    const allUsersData = await getAllUsers();
    setAllUsers(allUsersData.data.map(obj => obj.user_name));
  }  

  const runAddTransaction = async () => {
    setFormLoading(true);
    if (Object.values(data).filter(value => value === "").length > 0) {
        alert("All fields are required");
        return;
    }
    const result = await addTransactions(data);
    if (result.message.includes("Please log in")) {
      window.location.reload();
      return;
    }
    if (result?.success) {
      update("", result.data);
    }
    alert(result?.message);
    setModal(false);
    setFormLoading(false);
  }

  const onChange = (key: string, value: string) => {
    setData(state => {
      return {
        ...state,
        [key]: value,
      }
    })
  }

  useEffect(() => {
    fetchAllBooks();
    fetchAllUsers();
  }, []);

  return (
    <div className="w-full max-w-xs">
  <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <SelectBasicEl name="user_name" onChange={onChange} obj={data} options={allUsers} />
    <SelectBasicEl name="book_name" onChange={onChange} obj={data} options={allBooks} />
    <InputBasicEl name="due_date" onChange={onChange} obj={data} />
    <SelectBasicEl name="transaction_type" onChange={onChange} obj={data} options={Object.values(transactionStatusType)} />

    <div className="flex items-center justify-between">
      <button onClick={runAddTransaction} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Add Transaction
      </button>
    </div>
  </form>
</div>
  )
}

export default AddTransactionForm;