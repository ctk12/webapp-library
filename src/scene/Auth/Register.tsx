import { useAuthContext } from "@/context/AuthContext";
import "./Auth.scss";
import { useState } from "react";
import { NewUser } from "@/types/User";
import { roleType } from "@/types/enums";
import { validatePassword } from "@/utils/helpers";
import { SecondLoader } from "@/shared/AppLoader/MainLoader";
import { InputBasicEl, SelectBasicEl } from "@/components/FormElements";
import { useNavigate } from "react-router-dom";

const Register = ({setCurrent}: {setCurrent: (value: string) => void}) => {
  const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { loginAuthRegister }: any = useAuthContext();
    const [data, setData] = useState<Omit<NewUser, "id">>({
        user_name: "",
        name: "",
        email: "",
        password: "",
        role: roleType.USER,
        contact_number: "",
    });
    const navigate = useNavigate();

  const runRegister = async () => {
    if (Object.values(data).filter(value => value === "").length > 0) {
        alert("All fields are required");
        return;
    }
    if (!validatePassword(data.password)) {
        alert("Wrong password combination, Use letters numbers and special characters");
        return;
    }
    setLoading(true);
    const result = await loginAuthRegister(data);
    alert(result?.message);
    setLoading(false);
    if(result?.success) {
      navigate("/dashboard/books");
    }
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
      {loading && <SecondLoader />}
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <InputBasicEl name="user_name" onChange={onChange} obj={data} inAuth={true} />
    <InputBasicEl name="name" onChange={onChange} obj={data} inAuth={true} />
    <InputBasicEl name="email" onChange={onChange} obj={data} inAuth={true} />
    <InputBasicEl name="password" onChange={onChange} obj={data} inAuth={true} />
    <SelectBasicEl name="role" onChange={onChange} obj={data} options={Object.values(roleType)} inAuth={true} />
    <InputBasicEl name="contact_number" onChange={onChange} obj={data} inAuth={true} />

    <div className="flex items-center justify-between">
      <button onClick={runRegister} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Register
      </button>
      <a onClick={() => setCurrent("login")} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Login
      </a>
    </div>
  </form>
</div>
  )
}

export default Register;