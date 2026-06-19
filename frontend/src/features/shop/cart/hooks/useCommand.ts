import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../service/cart.service';
import toast from 'react-hot-toast';

export interface OrderPayload {
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export function useCommande() {
  const queryClient = useQueryClient();

  // On utilise le "isPending" natif de TanStack Query
  const { mutate, isPending } = useMutation({
    mutationFn: async (orderPayload: OrderPayload) => {
      return cartService.createOrder(orderPayload);
    },
    onError: (error: any) => {
      toast.error(`Une erreur est survenue: ${error.message || "Erreur serveur"}`);
    },
  });

  // On rajoute le paramètre "onSuccessCallback" à la fonction
  const createCommande = async (
    e: React.FormEvent<HTMLFormElement>, 
    cartItems: any[], 
    onSuccessCallback: () => void
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const customerName = formData.get('customerName') as string;
      const customerPhone = formData.get('customerPhone') as string;
      const pickupLocation = formData.get('pickupLocation') as string;

      if (!customerName || !customerPhone) {
        toast.error("Veuillez remplir tous les champs s'il vous plaît !");
        return;
      }

      const cleanedItems = cartItems.map((item) => ({
        productId: item.productid,
        quantity: item.quantity
      }));

      const orderData: OrderPayload = {
        customerName,
        customerPhone,
        pickupLocation,
        items: cleanedItems
      };

      mutate(orderData, {
        onSuccess: (data) => {
          toast.success(data.message || "Commande validée !");
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          onSuccessCallback();
        }
      });

    } catch (error) {
      console.error("Erreur formulaire :", error);
      toast.error("Une erreur interne est survenue.");
    }
  };

  return {
    createCommande,
    isPending
  };
}