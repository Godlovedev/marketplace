import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authService } from "../service/auth.service";
import toast from "react-hot-toast";

export function useRegister(){
    const navigate = useNavigate()

    const {mutate, isPending} = useMutation({
        mutationFn: async(formData: FormData) => {
            return authService.register(formData)
        },
        onSuccess: (data) => {
            toast.success(data.message),
            navigate("/login")
        },
        onError: (error) => {
            toast.error(`une erreur est survenue: ${error.message}`)
        }
    });

    const handleRegister = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        mutate(formData)
    }

    return{
        handleRegister,
        isPending
    }

}