import { ReactNode, useEffect, useRef } from "react";
import "./Layout.scss";
import SideBar from "../SideBar";
import { useAuthContext } from "@/context/AuthContext";

export const Layout = ({children}: {children: ReactNode}) => {
  const sideBarRef = useRef<HTMLDivElement>(null);

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const { sideBarData }: any = useAuthContext();

  const handleSideBar = () => {
    if (sideBarRef.current?.style?.display === "block") {
      sideBarRef.current!.style.display = "none";
    } else {
      sideBarRef.current!.style.display = "block";
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        sideBarRef.current!.style.display = "block";
      } else {
        sideBarRef.current!.style.display = "none";
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => { handleSideBar() }, [sideBarData]);

  return (
    <div className="flex h-screen w-full relative">
        <div ref={sideBarRef} className="sidebar-container">
            <SideBar />
        </div>
        <main className="main w-full max-[900px]:p-3 p-10 flex justify-center">
           <div className="main__wrap">
             {children}
           </div>
        </main>
    </div>
  )
}