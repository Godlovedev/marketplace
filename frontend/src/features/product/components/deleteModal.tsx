import { X } from 'lucide-react';
import { useDeleteProduct } from '../hooks/useDeleteProduct';

interface DeleteModalProps {
  product: { id: string; name: string };
  onClose: () => void;
}

export function DeleteProductModal({ product, onClose }: DeleteModalProps) {
  const { handleDelete, isDeleting } = useDeleteProduct();

  const handleConfirmDelete = () => {
    handleDelete(product.id);
    onClose();
  };

  return (
    <div className="modal modal-open backdrop-blur-sm bg-black/30 z-50">
      <div className="modal-box max-w-md bg-white rounded-2xl p-6 border border-gray-100 text-[#374151]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <h3 className="font-black text-xl text-red-600">Confirmer la suppression</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps */}
        <div className="py-2">
          <p className="text-sm text-gray-500 leading-relaxed">
            Êtes-vous sûr de vouloir supprimer le produit <strong>{product.name}</strong> ? 
            Cette action est irréversible et détruira définitivement toutes les données associées.
          </p>
        </div>
        
        {/* Actions */}
        <div className="modal-action border-t border-gray-100 pt-4 gap-2">
          <button onClick={onClose} className="btn btn-ghost rounded-xl" disabled={isDeleting}>
            Annuler
          </button>
          <button 
            onClick={handleConfirmDelete} 
            disabled={isDeleting}
            className="btn border-none bg-red-600 hover:bg-red-700 text-white font-black rounded-xl px-6"
          >
            {isDeleting ? 'Suppression...' : 'SUPPRIMER DÉFINITIVEMENT'}
          </button>
        </div>
      </div>
    </div>
  );
}