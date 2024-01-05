import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import routeConfig from "./config/RouteConfig";
import { useAuthContext } from "./context/AuthContext";
import Auth from "./scene/Auth/Auth";
import { userRestrictRoutes } from "./MasterRoutes";
import { useNavigate } from 'react-router-dom';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, isAdmin }: any = useAuthContext();
  const navigate = useNavigate();
  if (user && window.location.pathname === "/") {
    navigate("/dashboard/books");
    return;
  }

  return (
    <>
    {user
      ? (
        <Layout>
        <Routes>
          {routeConfig.filter(data => {
            if (userRestrictRoutes.includes(data.path) && !isAdmin) {
              return false;
            }
            return true;
          }).map(route => (
            <Route key={route.path} index={route.path === "/"} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Layout>
      )
      : <Auth /> }
    </>
  )
}

export default App;
