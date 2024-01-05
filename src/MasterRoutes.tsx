import BookRoutes from "./scene/Book/BookRoutes";
import MyBookRoutes from "./scene/MyBook/MyBookRoutes";
import TransactionRoutes from "./scene/Transaction/TransactionRoutes";
import UserRoutes from "./scene/User/UserRoutes";

const MasterRoutes = [
    BookRoutes,
    MyBookRoutes,
    UserRoutes,
    TransactionRoutes,
];

// eslint-disable-next-line react-refresh/only-export-components
export const userRestrictRoutes = [ UserRoutes.path ];

export default MasterRoutes;