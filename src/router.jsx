import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./comman/app-layout/app-layout";
// import logoImage from "./assets/yobhaLogo.png"
// Lazy load pages
const Home = lazy(() => import("./pages/Home/home2"));
const logoImage ="s"
const Router = () => {
  const routes = [
    // { path: "/", element: <Navigate to="/home" replace /> },
    { path: "/", element: <Home /> },

    { path: "/home", element: <Home /> },
  ];

  return (
    <Suspense fallback={ <div className="flex items-center justify-center h-screen">
      <img
        src={logoImage}
        alt="YOBHA Logo"
        className="h-8 md:h-10"
      />
    </div>}>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route
            key={index}
            path={path}
            element={path === "/login" ? element : <AppLayout>{element}</AppLayout>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;