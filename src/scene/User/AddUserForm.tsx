import { useState } from "react";
import { roleType } from "@/types/enums";
import { addUsers } from "@/api/users";
import { InputBasicEl, SelectBasicEl } from "@/components/FormElements";
import { User } from "@/types/User";
import { TextNormalA } from "@/shared/Typography";

const AddTransactionForm = ({setModal, update, setFormLoading}: {
    setModal: (value: boolean) => void;
    update: (id?: string, data?: User) => void;
    setFormLoading: (value: boolean) => void;
}) => {
    const [data, setData] = useState<Omit<User, "id">>({
      user_name: "",
      name: "",
      email: "",
      role: roleType.USER,
      contact_number: "",
    });

  const runAddUser = async () => {
    if (Object.values(data).filter(value => value === "").length > 0) {
        alert("All fields are required");
        return;
    }
    setFormLoading(true);
    const result = await addUsers(data);
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
  <form className="shadow-md rounded px-8 pt-3 pb-8 mb-6">
    <InputBasicEl name="user_name" onChange={onChange} obj={data} />
    <InputBasicEl name="name" onChange={onChange} obj={data} />
    <InputBasicEl name="email" onChange={onChange} obj={data} />
    <SelectBasicEl name="role" onChange={onChange} obj={data} options={Object.values(roleType)} />
    <InputBasicEl name="contact_number" onChange={onChange} obj={data} />

    <TextNormalA className="mb-2">Set Password with Forgot Password</TextNormalA>

    <div className="flex items-center justify-between">
      <button onClick={runAddUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Add User
      </button>
    </div>
  </form>
</div>
  )
}

export default AddTransactionForm;