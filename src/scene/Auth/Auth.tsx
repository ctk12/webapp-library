import "./Auth.scss";
import { TitleTextC } from "@/shared/Typography";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { useAuthContext } from "@/context/AuthContext";
import { MainLoader } from "@/shared/AppLoader/MainLoader";

const Auth = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setCurrent, current, setResetToken, resetToken, loadingAuth }: any = useAuthContext();

  return (
   <>
    {loadingAuth ? (
      <MainLoader />
    ):(
      <div className="flex w-full auth-height relative">
        <main className="main w-full p-10 flex flex-col items-center gap-9">
          <div className="main__wrap gap-6 p-3">
            <div className="flex justify-center mb-6">
            <TitleTextC>Online Library Management System</TitleTextC>
            </div>
            <div className="flex items-center justify-center gap-8">
                <button onClick={() => setCurrent("login")}><TitleTextC>Login</TitleTextC></button>
                <button onClick={() => setCurrent("register")}><TitleTextC>Register</TitleTextC></button>
            </div>
          </div>

          {current === "login" && <Login setCurrent={setCurrent} />}
          {current === "register" && <Register setCurrent={setCurrent} />}
          {current === "forgot-password" && <ForgotPassword setCurrent={setCurrent} setResetToken={setResetToken} />}
          {current === "reset-password" && <ResetPassword setCurrent={setCurrent} resetToken={resetToken} />}
        </main>
    </div>
   )}
   </>
  )
}

export default Auth;