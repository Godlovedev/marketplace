import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '../service/category.service';

// 1. Hook pour RÉCUPÉRER toutes les catégories
export function useGetCategories() {
  const {data: category, isLoading:isLoadingCategory} = useQuery({
    queryKey: ["category"],
    queryFn: async() => {
        return CategoryService.getAll()
    },
    retry: true,
  });

  return {
    category,
    isLoadingCategory
  }
}

