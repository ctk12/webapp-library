import { useState } from "react";
import { statusType } from "@/types/enums";
import { Book } from "@/types/Book";
import { addBook } from "@/api/books";
import { InputBasicEl, SelectBasicEl } from "@/components/FormElements";

const AddBookForm = ({setModal, update, setFormLoading}: {
    setModal: (value: boolean) => void;
    update: (id?: string, data?: Book) => void;
    setFormLoading: (value: boolean) => void;
}) => {
    const [data, setData] = useState<Omit<Book, "id">>({
        name: "",
        author: "",
        status: statusType.available,
    });

  const runAddBook = async () => {
    if (Object.values(data).filter(value => value === "").length > 0) {
        alert("All fields are required");
        return;
    }
    setFormLoading(true);
    const result = await addBook(data);
    if (result.message.includes("Please log in")) {
      window.location.reload();
      return;
    }
    alert(result?.message);
    if (result?.success) {
      update("", result.data);
      setModal(false);
    }
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

  return (
    <div className="w-full max-w-xs">
  <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <InputBasicEl name="name" onChange={onChange} obj={data} />
    <InputBasicEl name="author" onChange={onChange} obj={data} />
    <SelectBasicEl name="status" onChange={onChange} obj={data} options={Object.values(statusType)} />
    
    <div className="flex items-center justify-between">
      <button onClick={runAddBook} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Add Book
      </button>
    </div>
  </form>
</div>
  )
}

export default AddBookForm;