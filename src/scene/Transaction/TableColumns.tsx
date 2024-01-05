import { ActionsItems, InputEl, SelectEl } from "@/components/FormElements";
import { TableColumnsType } from "@/types/Table";
import { Transaction } from "@/types/Transaction";
import { transactionStatusType } from "@/types/enums";

export const tableColumns: TableColumnsType<Transaction>[] = [
    {
        title: "User Name",
        key: "user_name",
        width: "20%",
        render: (props, keyName) => {
            return props.isEdit
              ? <SelectEl name={keyName} onChange={props.onChange} obj={props.dataUpdate} options={props.allUsers} />
              : props.data.user_name;
        }
    },
    {
        title: "Book Name",
        key: "book_name",
        width: "30%",
        render: (props, keyName) => {
          return props.isEdit
            ? <SelectEl name={keyName} onChange={props.onChange} obj={props.dataUpdate} options={props.allBooks} />
            : props.data.book_name;
        }
    },
    {
        title: "Due Date",
        key: "due_date",
        width: "20%",
        render: (props, keyName) => {
            return props.isEdit
              ? <InputEl name={keyName} onChange={props.onChange} obj={props.dataUpdate} />
              : props.data.due_date;
        }
    },
    {
      title: "Transaction Type",
      key: "transaction_type",
      width: "20%",
      render: (props, keyName) => {
          return props.isEdit
            ? <SelectEl name={keyName} onChange={props.onChange} obj={props.dataUpdate} options={Object.values(transactionStatusType)} />
            : props.data.transaction_type;
      }
  },
    {
        title: "Actions",
        key: "actions",
        width: "10%",
        render: (props) => {
          return (
            <ActionsItems
              isEdit={props.isEdit}
              dataId={props.data.id}
              handleEdit={props.handleEdit}
              disableEdit={props.disableEdit}
              enableEdit={props.enableEdit}
              handleDelete={props.handleDelete}
            />
          )
        }
    }
];