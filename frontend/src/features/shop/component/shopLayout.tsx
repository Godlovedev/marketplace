import { useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { CartModal } from '../cart/component/cartModal';

export function ShopLayout() {
  // 1. États pour la modale et le compteur du badge
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length); 
  };

  useEffect(() => {
    // Initialisation sécurisée du localStorage
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Calcul initial au chargement
    updateCartCount();

    // Écouter les changements du localStorage pour synchroniser le badge en temps réel
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  // Style pour le lien actif de la navbar
  const activeLinkStyle = ({ isActive }: { isActive: boolean }) => 
    isActive 
      ? "text-[#1e3a8a] border-b-2 border-[#eab308] pb-1 font-black transition-all" 
      : "text-gray-500 hover:text-[#1e3a8a] transition-colors font-semibold pb-1";

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm border-b border-gray-100 p-4 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
          
          {/* Bloc de gauche (Logo + Nav) préservé et aligné */}
          <div className="flex items-center justify-start gap-16">
            {/* LOGO E-SHOP COMMERCE */}
            <NavLink to="/shop" className="flex items-center gap-3 select-none">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#eab308] text-[#1e3a8a] shadow-sm">
                <ShoppingCart className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-xl font-black tracking-wider text-[#1e3a8a] uppercase">
                  E-Shop
                </span>
                <span className="text-xs font-bold tracking-widest text-[#eab308] uppercase mt-0.5">
                  Commerce
                </span>
              </div>
            </NavLink>

            {/* ONGLETS */}
            <nav className="flex items-center gap-8 text-sm">
              <NavLink to="/shop" end className={activeLinkStyle}>
                Accueil
              </NavLink>
              <NavLink to="/shop/products" className={activeLinkStyle}>
                Produits
              </NavLink>
            </nav>
          </div>

          {/* ICÔNE DU PANIER DYNAMIQUE */}
          <button 
            onClick={() => setIsCartOpen(true)} // 👈 Ouvre la modale au clic
            className="btn btn-ghost btn-circle text-[#1e3a8a] bg-gray-50 hover:bg-gray-100 relative border border-gray-200/60 shadow-sm"
          >
            <div className="indicator">
              <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
              {/* Le badge affiche désormais le vrai compte dynamique */}
              <span className="badge badge-sm indicator-item bg-[#eab308] border-none text-[#1e3a8a] font-black h-4 w-4 p-0">
                {cartCount}
              </span>
            </div>
          </button>

        </div>
      </header>

      {/* CONTENU DYNAMIQUE */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:py-8 md:px-4">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm border-t border-gray-800 mt-auto">
        &copy; {new Date().getFullYear()} E-Shop. Tous droits réservés.
      </footer>

      {/* 3. L'INJECTION DE LA MODALE DU PANIER */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}