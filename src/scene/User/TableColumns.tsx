import { ActionsItems, InputEl, SelectEl } from "@/components/FormElements";
import { TableColumnsType } from "@/types/Table";
import { User } from "@/types/User";
import { roleType } from "@/types/enums";

export const tableColumns: TableColumnsType<User>[] = [
    {
        title: "User Name",
        key: "user_name",
        width: "20%",
        render: (props) => {
            return props.data.user_name;
        }
    },
    {
        title: "Name",
        key: "name",
        width: "20%",
        render: (props, keyName) => {
          return props.isEdit
            ? <InputEl name={keyName} onChange={props.onChange} obj={props.dataUpdate} />
            : props.data.name;
        }
    },
    {
        title: "Email",
        key: "email",
        width: "20%",
        render: (props) => {
            return props.data.email;
        }
    },
    {
      title: "Role",
      key: "role",
      width: "10%",
      render: (props, keyName) => {
          return props.isEdit
            ? <SelectEl name={keyName} onChange={props.onChange} obj={props.dataUpdate} options={Object.values(roleType)} />
            : props.data.role;
      }
    },
    {
      title: "Contact Number",
      key: "contact_number",
      width: "20%",
      render: (props, keyName) => {
          return props.isEdit
            ? <InputEl name={keyName} onChange={props.onChange} obj={props.dataUpdate} />
            : props.data.contact_number;
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