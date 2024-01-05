import { nestedRoutesType } from "@/config/RouteConfig";
import Transactions from "./Transaction";
import TransactionSvg from "@/assets/transaction.svg";
import TransactionActiveSvg from "@/assets/transaction-active.svg";

const TransactionRoutes: nestedRoutesType = {
  path: "/dashboard/transactions",
  component: <Transactions />,
  navIcon: { icon: TransactionSvg, activeIcon: TransactionActiveSvg },
  routes: [],
};

export default TransactionRoutes;
