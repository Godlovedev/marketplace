import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../service/product.service";
import toast from "react-hot-toast";

export function useCreateProduct(){

    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationFn: async(formData: FormData) => {
            return productService.create(formData)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["products"]})
            toast.success(data.message)
        },
        onError: (error) => {
            toast.error(`Une erreur s'ést produite: ${error.message}`)
        },
    });

    const handleCreate = (formData: FormData) => {
        mutate(formData)
    }

    return {
        handleCreate,
        isPending
    }
}