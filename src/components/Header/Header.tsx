import "./Header.scss";
import { useAuthContext } from "@/context/AuthContext";
import { TextNormalB, TitleTextA, TitleTextD } from "@/shared/Typography";
import { HiMenu } from "react-icons/hi";
import { useLocation } from "react-router";

export function Header({ setIsOpenModal, name }: {
  setIsOpenModal: (data: boolean) => void;
  name: string;
}) {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAdmin, setSideBarData }: any = useAuthContext();

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center w-full justify-between gap-8 max-[900px]:gap-5">
        <div className="header-left flex flex-col justify-center">
          <TextNormalB>{name} Details</TextNormalB>
          <TitleTextA>All {name}s</TitleTextA>
        </div>
        <div className="flex justify-center items-center">
          {isAdmin && location.pathname !== "/dashboard/my-books" && (
            <button onClick={() => setIsOpenModal(true)} className="add-button flex items-center justify-center">
              <TitleTextD>Add </TitleTextD>
            </button>
          )}
          <button
            onClick={() => setSideBarData((state: boolean) => !state)}
            className="sidebar-button flex items-center justify-center rounded-md">
            <TitleTextD><HiMenu style={{ fontSize: 30 }} /></TitleTextD>
          </button>
        </div>
      </div>
    </div>
  )
}
