import "./Auth.scss";
import { useState } from "react";
import { resetPasswordUser } from "@/api/auth";
import { SecondLoader } from "@/shared/AppLoader/MainLoader";
import { InputBasicEl } from "@/components/FormElements";
import { validatePassword } from "@/utils/helpers";

type PropsType = {
  setCurrent: (value: string) => void;
  resetToken: string;
}

const ResetPassword = ({setCurrent, resetToken}: PropsType) => {
  const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState<string>("");

  const runReset = async () => {
    if (!resetToken) {
      setCurrent("forgot-password");
      return;
    }
    if (!password) {
      alert("Password required");
      return;
    }
    if (!validatePassword(password)) {
      alert("Wrong password combination, Use letters numbers and special characters");
      return;
    }
    setLoading(true);
    const resetResult = await resetPasswordUser(resetToken, { password });
    if (!resetResult.success) {
      alert(resetResult.message);
      setLoading(false);
      return;
    }
    alert(resetResult.message);
    setCurrent("login");
    setLoading(false);
  }

  const onChange = (_key: string, value: string) => {
    setPassword(value);
  }

  return (
    <div className="w-full max-w-xs">
      {loading && <SecondLoader />}
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
   <InputBasicEl name="password" onChange={onChange} obj={{ password }} inAuth={true} />

    <div className="flex items-center justify-between">
      <button onClick={runReset} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Reset
      </button>
      <a onClick={() => setCurrent("login")} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Login
      </a>
    </div>
  </form>
</div>
  )
}

export default ResetPassword;