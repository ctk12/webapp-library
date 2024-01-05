import { Oval } from "react-loader-spinner";

export function MainLoader() {
    return (
      <div className="flex items-center justify-center h-screen">
        <Oval
          height={60}
          width={60}
          color="rgb(91 33 182)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#ccc"
          strokeWidth={3}
          strokeWidthSecondary={4}

        />
      </div>
    );
}

export function SecondLoader() {
  return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center max-[768px]:top-12 z-20" style={{ backgroundColor: "rgba(241, 239, 250, 0.2)" }}>
        <Oval
          height={60}
          width={60}
          color="rgb(91 33 182)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#ccc"
          strokeWidth={3}
          strokeWidthSecondary={4}
        />
      </div>
  );
}

export function DataLoader() {
  return (
      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "rgba(241, 239, 250, 0.2)" }}>
        <Oval
          height={60}
          width={60}
          color="rgb(91 33 182)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#ccc"
          strokeWidth={3}
          strokeWidthSecondary={4}
        />
      </div>
  );
}

export function RowLoader() {
  return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center max-[768px]:top-12 z-20" style={{ backgroundColor: "rgba(241, 239, 250, 0.2)" }}>
        <Oval
          height={30}
          width={30}
          color="rgb(91 33 182)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#ccc"
          strokeWidth={3}
          strokeWidthSecondary={4}
        />
      </div>
  );
}