import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authService } from "../service/auth.service";
import toast from "react-hot-toast";

export function useLogin(){
    const navigate = useNavigate()

    const {mutate, isPending} = useMutation({
        mutationFn: async(formData: FormData) => {
            return authService.login(formData)
        },
        onSuccess: (data) => {
            const token = data.access_token
            if(token){
                localStorage.setItem("token", token)
                toast.success("Connexion"),
                navigate("/admin/dashboard")
            }
        },
        onError: (error) => {
            toast.error(`une erreur est survenue: ${error.message}`)
        }
    });

    const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        mutate(formData)
    }

    return{
        handleLogin,
        isPending
    }

}