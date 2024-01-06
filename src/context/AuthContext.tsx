import React, { createContext, useContext, useEffect } from "react";
import { MainLoader } from "@/shared/AppLoader/MainLoader";
import { NewUser, Tokens, User } from "@/types/User";
import { loginUser, logoutUser, refreshTokensUser, registerUser } from "@/api/auth";
import { authResponse } from "@/utils/helpers";
import { roleType } from "@/types/enums";

export const AuthContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

type UserType =  {
    user: User;
    tokens: Tokens;
};

export const AuthContextProvider = ({
    children,
}: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState<UserType | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [loadingAuth, setLoadingAuth] = React.useState<boolean>(false);
    const [current, setCurrent] = React.useState<string>("login");
    const [resetToken, setResetToken] = React.useState<string>("");
    const [refreshToken] = React.useState<string>(localStorage.getItem("refreshToken") ?? "");
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    const [sideBarData, setSideBarData] = React.useState<boolean>(false);

    const refreshAuthUser = async () => {
        setLoadingAuth(true);
        if (!user && refreshToken) {
            const refreshTokenLogin = await refreshTokensUser({ refreshToken });
            if (refreshTokenLogin.success) {
                setLoadingAuth(false);
                setUser(refreshTokenLogin?.data);
                setIsAdmin(refreshTokenLogin.data.user.role === roleType.ADMIN);
                localStorage.setItem("refreshToken", refreshTokenLogin.data.tokens.refresh.token);
                localStorage.setItem("token", refreshTokenLogin.data.tokens.access.token);
                if (window.location.pathname === "/") {
                    window.location.href = `/dashboard/books`;
                }
            }
        }
        setLoadingAuth(false);
    }

    const loginAuthUser = async(data: { email: string, password: string }) => {
        const result = await loginUser(data);
        if (result.success) {
            setUser(result?.data);
            setIsAdmin(result.data.user.role === roleType.ADMIN);
            localStorage.setItem("refreshToken", result.data.tokens.refresh.token);
            localStorage.setItem("token", result.data.tokens.access.token);
        }
        return authResponse(result);
    }

    const loginAuthRegister = async(data: Omit<NewUser, "id">) => {
        const result = await registerUser(data);
        if (result.success) {
            setLoadingAuth(false);
            setUser(result?.data);
            setIsAdmin(result.data.user.role === roleType.ADMIN);
            localStorage.setItem("refreshToken", result.data.tokens.refresh.token);
            localStorage.setItem("token", result.data.tokens.access.token);
        }
        return authResponse(result);
    }

    const logoutAuthUser = async() => {
        if (user) {
            setLoading(true);
            const result = await logoutUser({ refreshToken: user?.tokens?.refresh.token });
            if (result.success) {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("token");
                setLoadingAuth(false);
                setUser(null);
            }
            setLoading(false);
            return result;
        }
    }

    useEffect(() => {
        refreshAuthUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loginAuthUser,
            logoutAuthUser,
            loginAuthRegister,
            setLoading,
            current,
            setCurrent,
            resetToken,
            setResetToken,
            setLoadingAuth,
            loadingAuth,
            setUser,
            isAdmin,
            setSideBarData,
            sideBarData,
        }}>
            {loading ? <MainLoader /> : children}
        </AuthContext.Provider>
    );
};