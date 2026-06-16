import { X, AlertTriangle } from 'lucide-react';
import { useDeleteCategory } from '../hooks/useDeleteCategory';

export function DeleteCategoryModal({ category, onClose }: { category: any, onClose: () => void }) {
  const { deleteCategory, isDeletingCategory } = useDeleteCategory();

  return (
    <div className="modal modal-open backdrop-blur-sm bg-black/30 z-50">
      <div className="modal-box max-w-sm bg-white rounded-2xl p-6 text-[#374151]">
        
        {/* AJOUT DE L'EN-TÊTE AVEC LE BOUTON X UTILISÉ ICI 👇 */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <h3 className="font-black text-xl text-red-600">Supprimer ?</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps du modal */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 my-4">
            Voulez-vous vraiment supprimer <strong>{category.name}</strong> ? 
            <br/><span className="text-red-500 font-bold">Attention :</span> Cela pourrait affecter les produits liés.
          </p>
        </div>

        {/* Actions */}
        <div className="modal-action border-t border-gray-100 pt-4 flex flex-col gap-2 w-full">
          <button 
            onClick={() => { deleteCategory(category.id); onClose(); }} 
            disabled={isDeletingCategory}
            className="btn border-none bg-red-600 hover:bg-red-700 text-white font-black rounded-xl w-full"
          >
            OUI, SUPPRIMER
          </button>
          <button onClick={onClose} className="btn btn-ghost rounded-xl w-full">Annuler</button>
        </div>
      </div>
    </div>
  );
}