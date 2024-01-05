import { Link } from "react-router-dom";
import DotSvg from "../../../assets/ellipse.svg";
import "./MenuItem.scss";
import { useAuthContext } from "@/context/AuthContext";

type Props = {
    icon: string,
    isActive: boolean,
    path: string,
}

export const MenuItem: React.FC<Props> = ({ icon, isActive, path }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { setSideBarData }: any = useAuthContext();
    const navName = path.split("/")
      .reverse()[0]
      .split("-")
      .map(value => value.replace(/^./, (letter) => letter.toUpperCase()))
      .join(" ");
    
    const onChangeSideBar = () => {
        if (window.innerWidth < 901) {
            setSideBarData((state: boolean) => !state);
        }
    }  
      
    return (
        <li className="relative menu-li" onClick={onChangeSideBar}>
            <div style={{ left: 50, zIndex: 1, width: "max-content" }} className="hidden-child absolute h-8 px-3 items-center justify-center rounded-md bg-white">{navName}</div>
            <Link to={path} className="flex justify-center items-center gap-1">
                {isActive &&  <img src={DotSvg} alt="dot" width={4} height={4} className="absolute -left-2" />}
                <img src={icon} alt="menu" width={24} height={24} />
            </Link>
        </li>
    );
}