import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "../service/category.service";
import toast from "react-hot-toast";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation({
    mutationFn: async (id: string) => {
      return CategoryService.delete(id);
    },
    onSuccess: () => {
        toast.success("Operation terminée")
        queryClient.invalidateQueries({ queryKey: ["category"] });
    }
  });

  return {
    deleteCategory,
    isDeletingCategory
  };
}