import { useAuthContext } from "@/context/AuthContext";
import "./Auth.scss";
import { useState } from "react";
import { forgotPasswordUser } from "@/api/auth";
import { SecondLoader } from "@/shared/AppLoader/MainLoader";
import { InputBasicEl } from "@/components/FormElements";

type PropsType = {
  setCurrent: (value: string) => void;
  setResetToken: (value: string) => void;
}

const ForgotPassword = ({setCurrent, setResetToken}: PropsType) => {
  const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { setLoadingAuth }: any = useAuthContext();
    const [email, setEmail] = useState<string>("");

  const runForgotPassword = async () => {
    setLoadingAuth(true);
    setLoading(true);
    const forgetResult = await forgotPasswordUser({ email });
    if (!forgetResult.success) {
      alert(forgetResult.message);
      setLoading(false);
      return;
    }
    setResetToken(forgetResult.data.resetToken);
    setCurrent("reset-password");
    setLoadingAuth(false);
    setLoading(false);
  }

  const onChange = (_key: string, value: string) => {
    setEmail(value);
  }

  return (
    <div className="w-full max-w-xs">
      {loading && <SecondLoader />}
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <InputBasicEl name="email" onChange={onChange} obj={{ email }} inAuth={true} />
    
    <div className="flex items-center justify-between">
      <button onClick={runForgotPassword} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
       Forgot Password
      </button>
      <a onClick={() => setCurrent("login")} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Login
      </a>
    </div>
  </form>
</div>
  )
}

export default ForgotPassword;