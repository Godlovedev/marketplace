import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "../service/category.service";
import toast from "react-hot-toast";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { mutate, isPending: isUpdatingCategory } = useMutation({
    mutationFn: async ({id, formData}: {id:string, formData:FormData}) => {
      return CategoryService.update(id, formData);
    },
    onSuccess: (data) => {
        toast.success(data.message)
        queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (error) => {
        toast.error(error.message)
    }
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id:string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    mutate({id, formData})
  }

  return {
    handleUpdate,
    isUpdatingCategory
  };
}