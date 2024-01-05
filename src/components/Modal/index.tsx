import { TitleTextC } from "@/shared/Typography";
import { FaXmark } from "react-icons/fa6";
import "./Modal.scss";
import { SecondLoader } from "@/shared/AppLoader/MainLoader";

function Modal({
    children,
    isOpenModal,
    setIsOpenModal,
    title,
    isLoading,
}: {
    children: React.ReactNode;
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
    title: string;
    isLoading: boolean;
}) {
  return (
    <div>
        {isOpenModal && (
        <div className="import-modal">
          <div className="import-modal__content relative">
            {isLoading && <SecondLoader />}
            <div className="head">
              <TitleTextC>{title}</TitleTextC>
              <FaXmark onClick={() => setIsOpenModal(false)} className="head__import-close-icon" />
            </div>

            <div className="hr"></div>

            <div className="body">
              <div className="body__content">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal;