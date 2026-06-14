import { Toaster } from "react-hot-toast";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Login } from "./features/auth/pages/login";
import { Register } from "./features/auth/pages/register";

function App() {


    let router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={"/admin/login"} />
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
                children: [
                    {
                        path: "",
                        element: "petit test"
                    }
                ]
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
