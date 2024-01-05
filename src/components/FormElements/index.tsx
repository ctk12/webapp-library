import { TitleTextD } from "@/shared/Typography";
import { getObjtoArray } from "@/utils/helpers";
import { FaEdit } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

export const InputBasicEl = ({ name, onChange, obj, inAuth }:
    { name: string; onChange: (name: string, value: string) => void; obj: object, inAuth?: boolean }) => {
        const valueData = getObjtoArray(obj).find(data => data[0] === name)![1];
    return (
        <div className="mb-4">
            <label className="block mb-2" htmlFor={name}>
                {inAuth ? (
                    `${name.charAt(0).toUpperCase()}${name.slice(1)}`.replace(/_/g, " ")
                ) : (
                    <TitleTextD>{`${name.charAt(0).toUpperCase()}${name.slice(1)}`.replace(/_/g, " ")}</TitleTextD>
                )}
            </label>
            <input
                onChange={(e) => onChange(name, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={name}
                type={name === "password" || name === "email" ? name : "text"}
                placeholder={name === "due_date"
                  ? "30-01-2050"
                  : name === "password"
                    ? "******************"
                    : name.replace(/_/g, " ")}
                value={valueData}
            />
        </div>
    );
}

export const InputEl = ({ name, onChange, obj, ...props }:
    { name: string; onChange: (name: string, value: string) => void; obj: object }) => {
        const valueData = getObjtoArray(obj).find(data => data[0] === name)![1];
    return (
        <input
            {...props}
            onChange={(e) => onChange(name, e.target.value)}
            className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            type="text"
            placeholder={name === "due_date" ? "30-01-2050" : name.replace(/_/g, " ")}
            value={valueData}
            style={{ padding: "8.7px 6px" }}
        />
    );
}

export const SelectBasicEl = ({ name, onChange, obj, options, inAuth }:
    { name: string; onChange: (name: string, value: string) => void; obj: object, options: string[], inAuth?: boolean }) => {
        const valueData = getObjtoArray(obj).find(data => data[0] === name)![1];
    return (
        <div className="mb-4">
            <label className="block  mb-2" htmlFor={name}>
                {inAuth ? (
                    `${name.charAt(0).toUpperCase()}${name.slice(1)}`.replace(/_/g, " ")
                ) : (
                    <TitleTextD>{`${name.charAt(0).toUpperCase()}${name.slice(1)}`.replace(/_/g, " ")}</TitleTextD>
                )}
            </label>
            <select
                value={valueData}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => onChange(name, e.target.value)}
                id={name}
            >
                <option>Please choose one {name.replace(/_/g, " ")}</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export const SelectEl = ({ name, onChange, obj, options }:
    { name: string; onChange: (name: string, value: string) => void; obj: object, options: string[] }) => {
        const valueData = getObjtoArray(obj).find(data => data[0] === name)![1];
    return (
        <select
            value={valueData}
            className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => onChange(name, e.target.value)}
            id={name}
            style={{ padding: "8.7px 6px" }}
        >
            <option>Please choose one {name.replace(/_/g, " ")}</option>
            {options.map((option, index) => {
                return (
                    <option key={index}>
                        {option}
                    </option>
                );
            })}
        </select>
    );
}

export const InputDivEl = ({ name, onChange, obj }:
    { name: string; onChange: (name: string, value: string) => void; obj: object }) => {
        const valueData = getObjtoArray(obj).find(data => data[0] === name)![1];
    return (
        <div
            onBlur={(e) => {
                const input = e.target as HTMLElement;
                onChange(name, input.textContent!);
            }}
            contentEditable={true}
            className="shadow appearance-none border rounded w-full !bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            placeholder={name}
            style={{ padding: "2.7px 6px" }}
            suppressContentEditableWarning={true}
        >
            {valueData}
        </div>
    );
}

export const ActionsItems = (props: {
    isEdit: boolean;
    dataId: string;
    handleEdit: () => void;
    disableEdit: () => void;
    enableEdit: (id: string) => void;
    handleDelete: (id: string) => void;
}) => {
    return props.isEdit
    ? (
        <div className="flex items-center gap-3">
        <button
        onClick={() => props.handleEdit()}
        className="flex items-center justify-center"
        style={{ backgroundColor: "var(--primary-orange)", borderRadius: 6, padding: "6px", minWidth: 60 }}
        >
            <TitleTextD>Save</TitleTextD>
        </button>
        <IoCloseOutline onClick={props.disableEdit} style={{ fontSize: 20, cursor: "pointer" }} />
        </div>
    ) : (
        <div className="flex items-center gap-9">
        <FaEdit style={{ fontSize: 20, cursor: "pointer" }} onClick={() => props.enableEdit(props.dataId)} />
        <MdDelete style={{ fontSize: 20, cursor: "pointer" }} onClick={() => props.handleDelete(props.dataId)} />
    </div>
    )
}