import React from "react";

// ALL PAGES
const Home = React.lazy(() => import("./views/admin/home/Home"));
const Page404 = React.lazy(() => import("./views/admin/page404/Page404"));
const Logout = React.lazy(() => import("./views/admin/logout/Logout"));

const routes = [
  { path: "/admin", exact: true, name: "Home", element: Home },
  { path: "/admin/notfound", name: "Page Not Found", element: Page404 },
  { path: "/admin/logout", name: "Logout", element: Logout },
];

export default routes;
