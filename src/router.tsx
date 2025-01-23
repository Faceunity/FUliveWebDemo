import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { lazy } from "react";
import React from "react";
import { Loading } from "./components/Loading";

const Agora = lazy(() => import("./Routes/Agora"));
const Home = lazy(() => import("./Routes/Home"));
const Layout = lazy(() => import("./components/Layout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/agora",
    element: <Agora />,
    children: [
      {
        path: "/agora",
        element: <Home />,
      },
    ],
  },
]);

export const Router = () => {
  return (
    <React.Suspense fallback={<Loading visible={true} />}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#407EFF",
            colorBorder: "#F5F6F7",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.Suspense>
  );
};
