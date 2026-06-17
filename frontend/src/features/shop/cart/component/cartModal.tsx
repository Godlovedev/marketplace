import { useEffect, useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, CheckCircle } from 'lucide-react';
import { useCommande } from '../hooks/useCommand';

type CartItem = {
  productid: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { createCommande, isPending } = useCommande();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOrdered, setIsOrdered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const items = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(items);
      setIsOrdered(false); 
    }
  }, [isOpen]);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage')); 
  };

  const incrementQuantity = (productid: string) => {
    const newCart = cartItems.map((item) =>
      item.productid === productid ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const decrementQuantity = (productid: string) => {
    const targetItem = cartItems.find((item) => item.productid === productid);
    if (!targetItem) return;

    if (targetItem.quantity <= 1) {
      removeItem(productid);
    } else {
      const newCart = cartItems.map((item) =>
        item.productid === productid ? { ...item, quantity: item.quantity - 1 } : item
      );
      updateCart(newCart);
    }
  };

  const removeItem = (productid: string) => {
    const newCart = cartItems.filter((item) => item.productid !== productid);
    updateCart(newCart);
  };

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    createCommande(e, cartItems, () => {
      updateCart([]); 
      setIsOrdered(true);
    });
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open backdrop-blur-sm bg-black/40 z-50" role="dialog">
      <div className="modal-box bg-white max-w-md rounded-2xl border border-gray-100 p-0 overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-4 border-b border-gray-100 bg-[#f8fafc] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 text-[#1e3a8a]">
            <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
            <h3 className="font-black uppercase text-sm tracking-wide">
              Mon Panier ({cartItems.length})
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CORPS DE LA MODALE */}
        <div className="p-4 overflow-y-auto flex-1 space-y-6 scrollbar-none">
          
          {isOrdered ? (
            <div className="text-center py-8 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-center text-green-500">
                <CheckCircle className="w-16 h-16" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-black text-[#1e3a8a] uppercase">Commande Reçue !</h4>
              <p className="text-gray-600 text-sm px-4">
                Merci pour votre confiance. Votre commande est enregistrée. Présentez-vous au point de retrait choisi pour récupérer vos articles et payer en espèces.
              </p>
              <button onClick={onClose} className="btn btn-sm bg-[#1e3a8a] text-white border-none rounded-xl px-6 mt-4">
                Fermer
              </button>
            </div>
          ) : cartItems.length > 0 ? (
            <>
              {/* LISTE DES ARTICLES */}
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Articles sélectionnés</span>
                {cartItems.map((item) => (
                  <div key={item.productid} className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <img 
                      src={item.imageUrl || 'https://placehold.co/100x100?text=No+Img'} 
                      alt={item.name} 
                      className="w-14 h-14 object-cover rounded-lg border border-gray-200 bg-white shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-xs truncate">{item.name}</h4>
                      <p className="text-[#1e3a8a] font-black text-sm mt-0.5">
                        {(item.price * item.quantity).toLocaleString('fr-FR')} <span className="text-[10px] font-bold text-gray-400">FCFA</span>
                      </p>
                      
                      <div className="flex items-center gap-2 mt-1.5">
                        <button type="button" onClick={() => decrementQuantity(item.productid)} className="w-5 h-5 bg-white border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100">
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-xs font-black text-gray-700 w-4 text-center">{item.quantity}</span>
                        <button type="button" onClick={() => incrementQuantity(item.productid)} className="w-5 h-5 bg-white border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100">
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>

                    <button type="button" onClick={() => removeItem(item.productid)} className="text-gray-400 hover:text-red-500 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <hr className="border-gray-100" />

              {/* FORMULAIRE DE COMMANDE */}
              <form onSubmit={handleCheckout} className="space-y-3">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Informations de livraison cash</span>
                
                <div className="form-control">
                  <input 
                    type="text" 
                    name="customerName" 
                    placeholder="Votre Nom & Prénom" 
                    className="w-full bg-gray-50 rounded-xl border border-gray-200 p-2.5 text-xs text-gray-800 focus:border-[#1e3a8a] focus:bg-white outline-none transition-all font-medium"
                    required
                  />
                </div>

                <div className="form-control">
                  <input 
                    type="tel" 
                    name="customerPhone"
                    placeholder="Numéro de Téléphone (WhatsApp de préf.)" 
                    className="w-full bg-gray-50 rounded-xl border border-gray-200 p-2.5 text-xs text-gray-800 focus:border-[#1e3a8a] focus:bg-white outline-none transition-all font-medium"
                    required
                  />
                </div>

                <div className="form-control">
                  <select 
                    name="pickupLocation"
                    defaultValue="point_1"
                    className="w-full bg-gray-50 rounded-xl border border-gray-200 p-2.5 text-xs text-gray-700 focus:border-[#1e3a8a] focus:bg-white outline-none transition-all font-bold"
                  >
                    <option value="point_1">Point de Retrait 1 (Centre-ville)</option>
                    <option value="point_2">Point de Retrait 2 (Quartier Nord)</option>
                    <option value="point_3">Point de Retrait 3 (Station Sud)</option>
                  </select>
                </div>

                {/* BLOC BOUTON ET TOTAL */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total à payer :</span>
                    <span className="text-xl font-black text-[#1e3a8a]">
                      {totalPrice.toLocaleString('fr-FR')} <span className="text-xs font-black">FCFA</span>
                    </span>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#eab308] hover:bg-[#d4a007] text-[#1e3a8a] font-black text-sm py-3 rounded-xl flex items-center justify-center gap-2 border-b-4 border-[#b88a06] shadow-md transition-all active:scale-[0.99] disabled:bg-gray-200 disabled:text-gray-400 disabled:border-none"
                  >
                    {isPending ? "ENVOI EN COURS..." : "CONFIRMER MA COMMANDE CASH"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-12 space-y-2">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" strokeWidth={1.5} />
              <p className="text-gray-500 font-bold text-sm">Votre panier est vide</p>
              <p className="text-gray-400 text-xs px-6">Ajoutez des produits depuis le catalogue pour passer commande !</p>
            </div>
          )}
        </div>

      </div>
      <div className="modal-backdrop bg-black/10" onClick={onClose}></div>
    </div>
  );
}