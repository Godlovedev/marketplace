import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Package } from 'lucide-react';
import { useGetProducts } from '../hooks/useGetProduct';
import { AddProductModal } from '../components/addModal';
import type { Product } from '../../../types/product';
import { DeleteProductModal } from '../components/deleteModal';
import { UpdateProductModal } from '../components/updateModal';
import { useGetCategories } from '../../category/hooks/useGetCategory';

export default function Products() {
  // Récupération par déstructuration depuis ton hook TanStack Query
  const { products, isLoading } = useGetProducts();
  const [searchTerm, setSearchTerm] = useState("");
  
  // NOUVEAU : État pour stocker la catégorie sélectionnée pour le filtrage
  const [selectedCategory, setSelectedCategory] = useState("");

  // États pour contrôler l'ouverture des modals et stocker le produit ciblé
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // recuperation des categories
  const { category } = useGetCategories();

  // NOUVEAU : Filtrage combiné par texte ET par catégorie
  const filteredProducts = products?.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Si selectedCategory est vide, on laisse passer tous les produits, sinon on vérifie l'ID
    const matchesCategory = selectedCategory === "" || product.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  if (isLoading) return <div className="p-6 text-center"><span className="loading loading-spinner loading-lg text-[#1e3a8a]"></span></div>;

  return (
    <div className="space-y-6">
      
      {/* HEADER BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-[#1e3a8a] tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-[#eab308]" />
            Gestion des Produits
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Total affiché : {filteredProducts.length} produits</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* BARRE DE RECHERCHE TEXTE */}
          <label className="input input-bordered flex items-center gap-2 bg-[#f0f4f8] border-gray-200 h-11 focus-within:outline-none focus-within:border-[#1e3a8a] rounded-xl w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input 
              type="text" 
              className="grow text-sm text-[#374151]" 
              placeholder="Rechercher un produit..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>

          {/* NOUVEAU : BEAU SELECT DE FILTRAGE PAR CATÉGORIE */}
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered bg-[#f0f4f8] border-gray-200 h-11 min-h-11 focus:outline-none focus:border-[#1e3a8a] rounded-xl text-sm text-[#374151] font-medium w-full sm:w-56"
          >
            <option value="">Toutes les catégories</option>
            {category?.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Ouvre le modal d'ajout */}
          <button 
            onClick={() => setIsAddOpen(true)}
            className="btn h-11 min-h-11 border-none bg-[#eab308] hover:bg-[#d4a007] text-[#1e3a8a] font-black rounded-xl shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            AJOUTER UN PRODUIT
          </button>
        </div>
      </div>

      {/* TABLEAU */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="table w-full table-zebra">
            <thead>
              <tr className="border-b border-gray-100 text-[#1e3a8a] text-sm font-bold bg-[#f8fafc]">
                <th className="py-4 pl-6">Produit</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th className="text-center pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[#374151]">
              {filteredProducts.map((product: Product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-[#f0f4f8]/30 transition-colors">
                  <td className="py-4 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 bg-gray-100">
                          <img src={product.imageUrl} alt={product.name} className="object-cover" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{product.name}</div>
                        <div className="text-xs text-gray-400">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">
                    <span className="badge badge-ghost rounded-lg font-semibold text-gray-600 border-gray-200">
                      {product.category?.name}
                    </span>
                  </td>
                  <td className="font-black text-[#1e3a8a]">{product.price} FCFA</td>
                  <td>
                    {product.stock > 0 ? (
                      <span className="text-success font-bold text-sm">{product.stock} en stock</span>
                    ) : (
                      <span className="text-error font-bold text-sm">Rupture</span>
                    )}
                  </td>
                  <td className="text-center pr-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setProductToEdit(product)}
                        className="btn btn-ghost btn-square btn-sm text-gray-400 hover:text-blue-600 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setProductToDelete(product)}
                        className="btn btn-ghost btn-square btn-sm text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddOpen && <AddProductModal categories={category} isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />}
      {productToEdit && <UpdateProductModal categories={category} product={productToEdit} onClose={() => setProductToEdit(null)} />}
      {productToDelete && <DeleteProductModal product={productToDelete} onClose={() => setProductToDelete(null)} />}

    </div>
  );
}