import React from 'react';
import { X } from 'lucide-react';
import { useUpdateProduct } from '../hooks/useUpdateProduct';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description: string; // 👈 1. AJOUT DANS L'INTERFACE TYPESCRIPT
}

interface UpdateProductModalProps {
  product: Product;
  categories: Category[];
  onClose: () => void;
}

export function UpdateProductModal({ product, categories, onClose }: UpdateProductModalProps) {
  const { handleUpdate, isUpdateting } = useUpdateProduct();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleUpdate(e, product.id);
    onClose();
  };

  return (
    <div className="modal modal-open backdrop-blur-sm bg-black/30 z-50">
      <div className="modal-box max-w-lg bg-white rounded-2xl p-6 border border-gray-100 text-[#374151]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <h3 className="font-black text-xl text-[#1e3a8a]">Modifier les informations</h3>
          <button type="button" onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="form-control flex gap-2">
            <label className="label font-bold text-sm text-gray-600" htmlFor="name">Nom du produit</label>
            <input 
              id="name"
              name="name" 
              type="text"
              className="input input-bordered bg-[#f0f4f8] border-gray-200 focus:outline-none focus:border-[#1e3a8a] rounded-xl"
              defaultValue={product.name} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-bold text-sm text-gray-600" htmlFor="price">Prix (FCFA)</label>
              <input 
                id="price"
                name="price" 
                type="number" 
                className="input input-bordered bg-[#f0f4f8] border-gray-200 focus:outline-none focus:border-[#1e3a8a] rounded-xl"
                defaultValue={product.price} 
                required 
              />
            </div>

            <div className="form-control">
              <label className="label font-bold text-sm text-gray-600" htmlFor="stock">Stock disponible</label>
              <input 
                id="stock"
                name="stock" 
                type="number" 
                className="input input-bordered bg-[#f0f4f8] border-gray-200 focus:outline-none focus:border-[#1e3a8a] rounded-xl"
                defaultValue={product.stock} 
                required 
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label font-bold text-sm text-gray-600" htmlFor="categoryId">Catégorie</label>
            <select 
              id="categoryId"
              name="categoryId" 
              className="select select-bordered bg-[#f0f4f8] border-gray-200 focus:outline-none focus:border-[#1e3a8a] rounded-xl text-sm font-medium"
              defaultValue={product.categoryId}
            >
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. AJOUT DU CHAMP TEXTAREA POUR LE MARKDOWN */}
          <div className="form-control flex-col flex gap-1">
            <label className="label font-bold text-sm text-gray-600" htmlFor="description">
              Description du produit (Supporte le Markdown)
            </label>
            <textarea 
              id="description"
              name="description" 
              className="textarea textarea-bordered bg-[#f0f4f8] border-gray-200 focus:outline-none focus:border-[#1e3a8a] rounded-xl text-sm h-32 resize-none"
              placeholder="Ex: # Titre du produit&#10;* Caractéristique 1&#10;**Texte en gras**"
              defaultValue={product.description}
            />
          </div>

          {/* Actions */}
          <div className="modal-action border-t border-gray-100 pt-4 gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost rounded-xl" disabled={isUpdateting}>
              Annuler
            </button>
            <button type="submit" disabled={isUpdateting} className="btn border-none bg-[#eab308] hover:bg-[#d4a007] text-[#1e3a8a] font-black rounded-xl px-6">
              {isUpdateting ? 'Enregistrement...' : 'METTRE À JOUR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}