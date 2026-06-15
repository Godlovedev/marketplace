import React from 'react';
import { X } from 'lucide-react';
import { useCreateProduct } from '../hooks/useCreateProduct';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {

    const {handleCreate, isPending: isCreating} = useCreateProduct()
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    handleCreate(formData)
    onClose();
  };

  return (
    <div className="modal modal-open backdrop-blur-sm bg-black/30 z-50">
      <div className="modal-box max-w-lg bg-white rounded-2xl p-6 border border-gray-100 text-[#374151]">
        
        {/* Header du Modal */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <h3 className="font-black text-xl text-[#1e3a8a]">Ajouter un nouveau produit</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulaire d'ajout */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="form-control flex gap-2">
            <label className="label font-bold text-sm text-gray-600">Nom du produit</label>
            <input type="text" name="name" className="input input-bordered bg-[#f0f4f8] border-gray-200 focus:outline-none focus:border-[#1e3a8a] rounded-xl" required />
          </div>

          <div className="form-control flex gap-2">
            <label className="label font-bold text-sm text-gray-600">Description</label>
            <textarea name="description" className="textarea textarea-bordered bg-[#f0f4f8] border-gray-200 focus:outline-none focus:border-[#1e3a8a] rounded-xl h-20" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-bold text-sm text-gray-600">Prix</label>
              <input type="number" name="price" className="input input-bordered bg-[#f0f4f8] border-gray-200 focus:outline-none focus:border-[#1e3a8a] rounded-xl" placeholder="EX: 1000 pour 1000FCFA" required />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm text-gray-600">Stock Initial</label>
              <input type="number" name="stock" className="input input-bordered bg-[#f0f4f8] border-gray-200 focus:outline-none focus:border-[#1e3a8a] rounded-xl" required />
            </div>
          </div>

          <div className="form-control">
            <label className="label font-bold text-sm text-gray-600">ID de la Catégorie</label>
            <input type="text" name="categoryId" className="input input-bordered bg-[#f0f4f8] border-gray-200 focus:outline-none focus:border-[#1e3a8a] rounded-xl" required />
          </div>

          <div className="form-control">
            <label className="label font-bold text-sm text-gray-600">Image du produit</label>
            <input 
              type="file" 
              name="file"
              accept="image/*"
              className="file-input file-input-bordered w-full bg-[#f0f4f8] border-gray-200 text-sm rounded-xl focus:outline-none" 
              required 
            />
          </div>

          {/* Actions du bas */}
          <div className="modal-action border-t border-gray-100 pt-4 gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost rounded-xl">Annuler</button>
            <button type="submit" disabled={isCreating} className="btn border-none bg-[#eab308] hover:bg-[#d4a007] text-[#1e3a8a] font-black rounded-xl px-6">
              CONFIRMER L'AJOUT
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}