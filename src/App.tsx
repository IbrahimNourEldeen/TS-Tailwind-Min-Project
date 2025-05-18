import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProductPage from "./components/ProductPage";
import MainContent from "./components/MainContent";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index:true,
          element: <MainContent />
        },
        {
          path: '/product/:id',
          element: <ProductPage />
        },

      ]
    },

  ]);
  return <RouterProvider router={routers} />
}

export default App
