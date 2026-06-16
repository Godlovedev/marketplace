import { X } from 'lucide-react';
import { useCreateCategory } from '../hooks/useCreateCategory';

export function AddCategoryModal({ onClose }: { onClose: () => void }) {
  const { handleCreate, isCreatingCategory } = useCreateCategory();

  return (
    <div className="modal modal-open backdrop-blur-sm bg-black/30 z-50">
      <div className="modal-box max-w-md bg-white rounded-2xl p-6 text-[#374151]">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h3 className="font-black text-xl text-[#1e3a8a]">Nouvelle Catégorie</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-gray-400"><X /></button>
        </div>
        <form onSubmit={(e) => {handleCreate(e); onClose()}} className="space-y-4">
          <div className="form-control">
            <label className="label font-bold text-sm text-gray-600">Nom</label>
            <input name="name" type="text" className="input input-bordered bg-[#f0f4f8] rounded-xl focus:border-[#1e3a8a]" required />
          </div>
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost rounded-xl">Annuler</button>
            <button type="submit" disabled={isCreatingCategory} className="btn border-none bg-[#eab308] hover:bg-[#d4a007] text-[#1e3a8a] font-black rounded-xl">
              CONFIRMER LA CRÉATION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}