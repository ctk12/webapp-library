import { useAuthContext } from "@/context/AuthContext";
import "./Auth.scss";
import { useState } from "react";
import { SecondLoader } from "@/shared/AppLoader/MainLoader";
import { InputBasicEl } from "@/components/FormElements";
import { useNavigate } from "react-router-dom";

const Login = ({setCurrent}: {setCurrent: (value: string) => void}) => {
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { loginAuthUser }: any = useAuthContext();
    const [data, setData] = useState<{ email: string; password: string }>({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

  const runLogin = async () => {
    if (Object.values(data).filter(value => value === "").length > 0) {
      alert("All fields are required");
      return;
    }
    setLoading(true);
    const result = await loginAuthUser(data);
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
    <InputBasicEl name="email" onChange={onChange} obj={data} inAuth={true} />
    <InputBasicEl name="password" onChange={onChange} obj={data} inAuth={true} />

    <div className="flex items-center justify-between">
      <button onClick={runLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Log In
      </button>
      <a onClick={() => setCurrent("forgot-password")} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </form>
</div>
  )
}

export default Login;