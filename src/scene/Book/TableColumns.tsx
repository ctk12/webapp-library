import { ActionsItems, InputDivEl, InputEl, SelectEl } from "@/components/FormElements";
import { Book } from "@/types/Book";
import { TableColumnsType } from "@/types/Table";
import { statusType } from "@/types/enums";

export const tableColumns: TableColumnsType<Book>[] = [
    {
        title: "Name",
        key: "name",
        width: "30%",
        render: (props, keyName) => {
            return props.isEdit
              ? <InputDivEl name={keyName} onChange={props.onChange} obj={props.dataUpdate} />
              : props.data.name;
        }
    },
    {
        title: "Author",
        key: "author",
        width: "30%",
        render: (props, keyName) => {
          return props.isEdit
            ? <InputEl name={keyName} onChange={props.onChange} obj={props.dataUpdate} />
            : props.data.author;
        }
    },
    {
        title: "Status",
        key: "status",
        width: "30%",
        render: (props, keyName) => {
            return props.isEdit
              ? <SelectEl name={keyName} onChange={props.onChange} obj={props.dataUpdate} options={Object.values(statusType)} />
              : props.data.status;
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
