import { nestedRoutesType } from "@/config/RouteConfig";
import MyBooks from "./MyBook";
import MyBookSvg from "@/assets/my-books.svg";
import MyBookActiveSvg from "@/assets/my-books-active.svg";

const MyBookRoutes: nestedRoutesType = {
  path: "/dashboard/my-books",
  component: <MyBooks />,
  navIcon: { icon: MyBookSvg, activeIcon: MyBookActiveSvg },
  routes: [],
};

export default MyBookRoutes;
