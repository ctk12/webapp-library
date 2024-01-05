import { PaginationType } from "./ApiData";

export interface TableColumnsType<T extends tableRowExtendObject> {
    title: string;
    key: string;
    width: string;
    render: (props: TableRowProps<T>, keyName: string) => React.ReactNode;
}

export interface TableRowProps<T extends tableRowExtendObject> {
    data: T;
    isLast: boolean;
    isEdit: boolean;
    enableEdit: (id: string) => void;
    disableEdit: () => void;
    handleDelete: (id: string) => void;
    updateLoading: boolean;
    onChange: (key: string, value: string) => void;
    handleEdit: () => void;
    dataUpdate: T;
    tableColumns: TableColumnsType<T>[];
    allBooks: string[],
    allUsers: string[],
}

export interface tableRowExtendObject {
    id: string
}

export interface TablePropsType<T extends tableRowExtendObject> {
    columnsProps: Omit<TableRowProps<T>, "data" | "isLast" | "isEdit">;
    paginationProps: {
        pagination: PaginationType;
        handlePageChange: (newPage: number) => void;
        fetchLoading: boolean;
        paginatedData: T[];
    }
}