import MasterRoutes from "@/MasterRoutes";
import PageNotFound from "@/scene/Common/PageNotFound";
import { ReactNode } from "react";

export type routesType = {
    path: string,
    component: ReactNode,
};

export type nestedRoutesType = {
    path: string,
    component: ReactNode,
    navIcon: { icon: string, activeIcon: string }
    routes: routesType[],
};

const resolveNestedRoutes = (nestedRoutes: nestedRoutesType): routesType[] => {
    const parentRoute = {path: nestedRoutes.path, component: nestedRoutes.component};
    return nestedRoutes.routes.reduce((allRoutes, currentRoute) => {
        return [...allRoutes, { ...currentRoute, path: `${parentRoute.path}${currentRoute.path}` }];
    }, [parentRoute]);
}

const routeConfig = MasterRoutes.map((route: nestedRoutesType) => resolveNestedRoutes(route))
  .reduce((acc, arr) => [...acc, ...arr], []);

routeConfig.push({
    path: "*",
    component: <PageNotFound />,
});

export const navRoutes = MasterRoutes.map((route: nestedRoutesType) => {
    const paths = route.routes.reduce((prev, current) => {
        return [...prev, `${route.path}${current.path}`];
    }, [route.path]).slice(1);

    return {
        path: route.path,
        childPath: paths,
        icon: route.navIcon.icon,
        activeIcon: route.navIcon.activeIcon,
    }
});

export default routeConfig;