import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import Home from "./pages/home";
import NotFound from "./pages/notFoud";
import Assignment from "./pages/Assignment/Assignment";
import Layout2 from "./layout/layout2";
import Hero from "./pages/Hero/Hero";

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/404",
      element: <NotFound />,
    },
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
      path: "/assignment",
      element: <Assignment />,
    },
    {
      path: "/home",
      element: <Hero />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
