import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import Home from "./pages/home";
import NotFound from "./pages/notFoud";
import Assignment from "./pages/Assignment/Assignment";
import Layout2 from "./layout/layout2";

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
