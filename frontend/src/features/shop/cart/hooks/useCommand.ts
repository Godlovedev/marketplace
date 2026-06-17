import { useState } from 'react';

interface OrderPayload {
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export function useCommande() {
  const [isPending, setIsPending] = useState(false);

  const createCommande = async (
    e: React.FormEvent<HTMLFormElement>, 
    cartItems: any[], 
    onSuccess: () => void
  ) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);
      const customerName = formData.get('customerName') as string;
      const customerPhone = formData.get('customerPhone') as string;
      const pickupLocation = formData.get('pickupLocation') as string;

      if (!customerName || !customerPhone) {
        alert("Veuillez remplir tous les champs s'il vous plaît !");
        setIsPending(false);
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

      console.log("=== DONNÉES REÇUES DANS LE HOOK ===");
      console.log(orderData);

      // Simulation d'une attente réseau de 1 seconde avant de valider
      setTimeout(() => {
        onSuccess(); // 👈 APPEL CRITIQUE : Déclenche la suite dans la modale
        setIsPending(false);
      }, 1000);

    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Impossible de joindre le serveur. Vérifiez votre connexion.");
      setIsPending(false);
    }
    // Note : On retire le "finally" temporairement car le setTimeout gère la fin de l'asynchronisme local
  };

  return {
    createCommande,
    isPending
  };
}