import { X } from 'lucide-react';
import { useUpdateCategory } from '../hooks/useUpdateCategory';

export function UpdateCategoryModal({ category, onClose }: { category: any, onClose: () => void }) {
  const { handleUpdate, isUpdatingCategory } = useUpdateCategory();


  return (
    <div className="modal modal-open backdrop-blur-sm bg-black/30 z-50">
      <div className="modal-box max-w-md bg-white rounded-2xl p-6 text-[#374151]">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h3 className="font-black text-xl text-[#1e3a8a]">Modifier la catégorie</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-gray-400"><X /></button>
        </div>
        <form onSubmit={(e) => {handleUpdate(e, category.id); onClose()}} className="space-y-4">
          <div className="form-control">
            <label className="label font-bold text-sm text-gray-600">Nouveau nom</label>
            <input name="name" type="text" defaultValue={category.name} className="input input-bordered bg-[#f0f4f8] rounded-xl focus:border-[#1e3a8a]" required />
          </div>
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost rounded-xl">Annuler</button>
            <button type="submit" disabled={isUpdatingCategory} className="btn border-none bg-[#eab308] hover:bg-[#d4a007] text-[#1e3a8a] font-black rounded-xl">
              ENREGISTRER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}