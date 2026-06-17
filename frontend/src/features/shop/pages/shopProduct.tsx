import { useState } from 'react';
import { ShoppingBag, Truck, Search, Loader2, X } from 'lucide-react';
import { useGetCategories } from '../../category/hooks/useGetCategory';
import { useGetProducts } from '../../product/hooks/useGetProduct';
import ReactMarkdown from 'react-markdown';
import { useCart } from '../cart/hooks/useAddToCart';

const ALL_CATEGORY_OPTION = { id: 'all', name: 'Tout' };

export function ShopProducts() {

  const {addToCart} = useCart()

  const { category: apiCategories = [], isLoadingCategory } = useGetCategories();
  const { products: apiProducts = [], isLoading: isLoadingProducts } = useGetProducts();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // États pour gérer le produit sélectionné pour la modale
  const [selectedProductForModal, setSelectedProductForModal] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoriesList = [ALL_CATEGORY_OPTION, ...apiCategories];

  const filteredProducts = apiProducts.filter((product: any) => {
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Fonction pour ouvrir la modale avec le bon produit
  const openDescriptionModal = (product: any) => {
    setSelectedProductForModal(product);
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modale cleanly
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductForModal(null);
  };

  if (isLoadingCategory || isLoadingProducts) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 className="w-10 h-10 text-[#1e3a8a] animate-spin" />
        <p className="text-gray-500 font-medium text-sm">Chargement du catalogue...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-2 sm:px-4">
      
      {/* 1. MINI-BANNIÈRE DE LIVRAISON */}
      <div className="w-full bg-[#1e3a8a] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 border-[#eab308] shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <span className="bg-[#eab308] text-[#1e3a8a] text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
            Info Delivery
          </span>
          <h2 className="text-xl font-black tracking-tight mt-1">LIVRAISON RAPIDE & SÛRE</h2>
          <p className="text-sm text-blue-100 max-w-md">
            Récupérez vos colis sur nos <span className="text-[#eab308] font-bold">3 points de retrait</span> précis. Paiement cash en main propre au livreur !
          </p>
        </div>
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-900/50 border border-blue-700/50 text-[#eab308] shrink-0">
          <Truck className="w-7 h-7" />
        </div>
      </div>

      {/* 2. BARRE DE RECHERCHE ET TITRE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <h1 className="text-2xl font-black text-[#1e3a8a] uppercase tracking-wide">
          Nos Produits
        </h1>
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-xl border border-gray-300 p-2.5 pl-10 text-sm text-gray-800 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#eab308]/30 outline-none transition-all shadow-inner"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
        </div>
      </div>

      {/* 3. ONGLET CATÉGORIES DYNAMIQUES STYLE YOUTUBE */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none whitespace-nowrap select-none">
        {categoriesList.map((cat: any) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border transition-all duration-200 ${
                isSelected
                  ? 'bg-[#1e3a8a] border-[#1e3a8a] text-white shadow-sm ring-2 ring-[#eab308]/50'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* 4. GRILLE DES PRODUITS */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
          {filteredProducts.map((product: any) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl border border-gray-200/80 p-3 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
            >
              {/* Image du produit */}
              <div className="w-full aspect-square rounded-xl bg-gray-50 overflow-hidden mb-3 relative border border-gray-100 flex items-center justify-center">
                <img 
                  src={product.imageUrl || 'https://placehold.co/500x500?text=Pas+d+image'} 
                  alt={product.name} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/500x500?text=Image+Introuvable';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Contenu textuel */}
              <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm line-clamp-2 min-h-10">
                    {product.name}
                  </h3>
                  <p className="text-[#1e3a8a] font-black text-base mt-0.5">
                    {Number(product.price).toLocaleString('fr-FR')} <span className="text-xs font-bold text-gray-500">FCFA</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button 
                    onClick={() => openDescriptionModal(product)}
                    className="bg-white hover:bg-gray-50 text-[#1e3a8a] border border-gray-300 font-bold text-xs py-2 px-1 rounded-xl transition-all active:scale-[0.98] text-center"
                  >
                    VOIR
                  </button>

                  {/* Bouton AJOUTER */}
                  <button 
                    onClick={() => {addToCart(product)}}
                    className="bg-[#eab308] hover:bg-[#d4a007] text-[#1e3a8a] font-black text-xs py-2 px-1 rounded-xl flex items-center justify-center gap-1 border-b-2 border-[#b88a06] transition-all active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-3 h-3" strokeWidth={2.5} />
                    AJOUTER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">Aucun produit ne correspond à votre recherche.</p>
        </div>
      )}

      {/* 5. MODALE DE DESCRIPTION UNIQUE (DAISYUI) */}
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`} role="dialog">
        <div className="modal-box bg-white max-w-lg rounded-2xl border border-gray-100 p-0 overflow-hidden shadow-2xl relative">
          
          {/* Header de la Modale */}
          <div className="p-4 border-b border-gray-100 bg-[#f8fafc] flex justify-between items-center">
            <h3 className="font-black text-[#1e3a8a] uppercase text-sm tracking-wide truncate pr-4">
              Détails du produit
            </h3>
            <button 
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:text-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Corps de la Modale avec le Markdown */}
          <div className="p-6 overflow-y-auto max-h-[65vh] space-y-4">
            <h2 className="text-xl font-extrabold text-gray-800">
              {selectedProductForModal?.name}
            </h2>
            <p className="text-lg font-black text-[#1e3a8a]">
              {Number(selectedProductForModal?.price).toLocaleString('fr-FR')} FCFA
            </p>

            <hr className="border-gray-100" />

            {/* Zone Markdown stylisée */}
            <div className="prose prose-sm max-w-none text-gray-600 prose-headings:text-[#1e3a8a] prose-strong:text-[#1e3a8a] prose-li:marker:text-[#eab308] pt-1">
              {selectedProductForModal?.description ? (
                <ReactMarkdown>{selectedProductForModal.description}</ReactMarkdown>
              ) : (
                <p className="italic text-gray-400 text-xs">Aucune description disponible pour cet article.</p>
              )}
            </div>
          </div>

          {/* Footer de la Modale */}
          <div className="p-4 border-t border-gray-100 bg-[#f8fafc] flex justify-end">
            <button 
              onClick={() => {
                addToCart(selectedProductForModal);
                closeModal()
              }}
              className="bg-[#eab308] hover:bg-[#d4a007] text-[#1e3a8a] font-black text-xs py-2.5 px-6 rounded-xl flex items-center gap-2 border-b-2 border-[#b88a06] shadow-sm transition-all active:scale-[0.98]"
            >
              <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2.5} />
              AJOUTER AU PANIER
            </button>
          </div>

        </div>

        {/* Permet de fermer en cliquant à l'extérieur de la modale */}
        <div className="modal-backdrop bg-black/40 backdrop-blur-sm" onClick={closeModal}></div>
      </div>

    </div>
  );
}