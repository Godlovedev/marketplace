import { Toaster } from "react-hot-toast";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Login } from "./features/auth/pages/login";
import { Register } from "./features/auth/pages/register";
import { DashboardLayout } from "./components/layout/dashboardLayout";
import Products from "./features/product/pages/product";
import Categories from "./features/category/pages/category";
import { ShopLayout } from "./features/shop/component/shopLayout";
import { ShopHome } from "./features/shop/pages/shopHome";
import { ShopProducts } from "./features/shop/pages/shopProduct";

function App() {


    let router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={"/shop"} />
    },
    {
        path: "/admin",
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "dashboard",
                element: <DashboardLayout />,
                children: [
                    {
                        path: "",
                        element: "petit test ici c'est le dashboard"
                    },
                    {
                        path: "products",
                        element: <Products />
                    },
                    {
                        path: "category",
                        element: <Categories />
                    }
                ]
            }
        ]
    },
    {
        path: "/shop",
        element: <ShopLayout />,
        children: [
            {
                path: "",
                element: <ShopHome />
            },
            {
                path: "products",
                element: <ShopProducts />
            }
        ]
    }
    ]);



    return (
        <>
        <Toaster position="top-center" reverseOrder={false}/>
        <RouterProvider router={router} />
        </>
    )
}

export default App
