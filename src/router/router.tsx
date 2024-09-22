import { createBrowserRouter } from "react-router-dom";
import { CompleteListPage, MensPage, NewProduct, StoreLayout, WomensPage, } from "../products";
import { ErrorPage } from "../ErrorPage";
import { ProductById } from "../products/pages/ProductById";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <StoreLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <CompleteListPage />,
      },
      {
        path: "men",
        element: <MensPage />,
      },
      {
        path: "women",
        element: <WomensPage />,
      },
      {
        path: "new",
        element: <NewProduct />,
      },
      {
        path: "product/:id",
        element: <ProductById />,
      },
    ],
  },
  {},
]);
