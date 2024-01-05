import "./SideBar.scss";
import LibrarySvg from "../../assets/library.svg";
import { MenuItem } from "./MenuItem";
import { useLocation } from "react-router";
import { navRoutes } from "@/config/RouteConfig";
import { TbLogout } from "react-icons/tb";
import { useAuthContext } from "@/context/AuthContext";
import { userRestrictRoutes } from "@/MasterRoutes";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
    const location = useLocation();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { logoutAuthUser, isAdmin }: any = useAuthContext();
    const navigate = useNavigate();

    const runLogout = async () => {
        if (confirm("Are sure to logout?")) {
        await logoutAuthUser();
        navigate("/");
        }
    }
    
    return (
       <div className="sidebar flex flex-col items-center gap-11">
        <div>
          <img src={LibrarySvg} alt="logo" width={30} height={30} />
        </div>

        <ul className="flex flex-col gap-9 h-full">
            {navRoutes.filter(data => {
            if (userRestrictRoutes.includes(data.path) && !isAdmin) {
              return false;
            }
            return true;
          }).map(data => {
                const { path, childPath, icon, activeIcon } = data;
                const isActive = location.pathname === path || childPath.includes(location.pathname);
                return <MenuItem key={path} icon={isActive ? activeIcon : icon} isActive={isActive} path={path} />
            })}

            <li onClick={runLogout} className="relative menu-li" style={{ cursor: "pointer" }}>
                <div style={{ left: 50, zIndex: 1 }} className="hidden-child absolute h-8 px-3 items-center justify-center rounded-md bg-white">Logout</div>
                <TbLogout style={{ color: "var(--primary-orange-hover)", fontSize: 30 }} />
            </li>
        </ul>
       </div>
    )
}