import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "../service/category.service";
import toast from "react-hot-toast";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { mutate, isPending: isCreatingCategory } = useMutation({
    mutationFn: async (formData: FormData) => {
      return CategoryService.create(formData);
    },
    onSuccess: (data) => {
        toast.success(data.message)
        queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (error) => {
        toast.error(error.message)
    }
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    mutate(formData)
  }

  return {
    handleCreate,
    isCreatingCategory
  };
}