import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { cartService } from '../service/cart.service'; 

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData}) => {
      return cartService.updateOrderStatus(id, formData); 
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Statut mis à jour !");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: any) => {
      toast.error(`Erreur : ${error.message || "Impossible de changer le statut"}`);
    }
  });

  const handleSetStatus = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    mutate({id, formData})
  }

  return { handleSetStatus, isUpdating };
}