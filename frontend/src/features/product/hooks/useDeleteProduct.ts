import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../service/product.service";
import toast from "react-hot-toast";

export function useDeleteProduct(){

    const queryClient = useQueryClient()

    const {mutate, isPending: isDeleting} = useMutation({
        mutationFn: async(id:string) => {
            return productService.delete(id)
        },
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({queryKey: ["products"]})
        },
        onError: (error) => {
            toast.error(`Une erreur s'ést produite: ${error.message}`)
        },
    });

    const handleDelete = (id: string) => {
        mutate(id)
    }

    return {
        handleDelete,
        isDeleting
    }
}