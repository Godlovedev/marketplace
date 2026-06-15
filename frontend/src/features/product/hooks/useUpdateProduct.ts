import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../service/product.service";
import toast from "react-hot-toast";

export function useUpdateProduct(){
    const queryClient = useQueryClient()

    const {mutate, isPending: isUpdateting} = useMutation({
        mutationFn: async({id, formData}: {id:string, formData: FormData}) => {
            return productService.update(id, formData)
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({queryKey: ["products"]})
            
        }
    })

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        mutate({id, formData})
    }

    return {
        handleUpdate,
        isUpdateting
    }
}