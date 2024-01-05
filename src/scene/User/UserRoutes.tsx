import { nestedRoutesType } from "@/config/RouteConfig";
import Users from "./User";
import userSvg from "@/assets/user.svg";
import userActiveSvg from "@/assets/user-active.svg";

const UserRoutes: nestedRoutesType = {
  path: "/dashboard/users",
  component: <Users />,
  navIcon: { icon: userSvg, activeIcon: userActiveSvg },
  routes: [],
};

export default UserRoutes;
