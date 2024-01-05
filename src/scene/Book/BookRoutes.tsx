import { nestedRoutesType } from "@/config/RouteConfig";
import Books from "./Book";
import BookSvg from "@/assets/book.svg";
import BookActiveSvg from "@/assets/book-active.svg";

const BookRoutes: nestedRoutesType = {
  path: "/dashboard/books",
  component: <Books />,
  navIcon: { icon: BookSvg, activeIcon: BookActiveSvg },
  routes: [],
};

export default BookRoutes;
