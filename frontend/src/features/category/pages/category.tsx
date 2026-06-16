import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Layers } from 'lucide-react';
import { useGetCategories } from '../hooks/useGetCategory';
import { AddCategoryModal } from '../components/AddCategoryModal';
import { DeleteCategoryModal } from '../components/DeleteCategoryModal';
import { UpdateCategoryModal } from '../components/UpdateCategoryModal';

export default function Categories() {
  const { category, isLoadingCategory } = useGetCategories();
  const [searchTerm, setSearchTerm] = useState("");

  // États pour les modaux
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<any | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<any | null>(null);

  // Filtrage par texte
  const filteredCategories = category?.filter((cat: any) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoadingCategory) return <div className="p-6 text-center"><span className="loading loading-spinner loading-lg text-[#1e3a8a]"></span></div>;

  return (
    <div className="space-y-6">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-[#1e3a8a] tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#eab308]" />
            Gestion des Catégories
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{filteredCategories.length} catégories répertoriées</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <label className="input input-bordered flex items-center gap-2 bg-[#f0f4f8] border-gray-200 h-11 focus-within:outline-none focus-within:border-[#1e3a8a] rounded-xl w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input 
              type="text" 
              className="grow text-sm text-[#374151]" 
              placeholder="Chercher une catégorie..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>

          <button 
            onClick={() => setIsAddOpen(true)}
            className="btn h-11 min-h-11 border-none bg-[#eab308] hover:bg-[#d4a007] text-[#1e3a8a] font-black rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            NOUVELLE CATÉGORIE
          </button>
        </div>
      </div>

      {/* LISTE / TABLEAU */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="table w-full table-zebra">
          <thead>
            <tr className="border-b border-gray-100 text-[#1e3a8a] text-sm font-bold bg-[#f8fafc]">
              <th className="py-4 pl-6">Nom de la catégorie</th>
              <th className="hidden md:table-cell">ID Unique</th>
              <th className="text-center pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#374151]">
            {filteredCategories.map((cat: any) => (
              <tr key={cat.id} className="border-b border-gray-50 hover:bg-[#f0f4f8]/30 transition-colors">
                <td className="py-4 pl-6 font-bold text-gray-800">
                  {cat.name}
                </td>
                <td className="hidden md:table-cell text-xs text-gray-400 font-mono">
                  {cat.id}
                </td>
                <td className="text-center pr-6">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => setCategoryToEdit(cat)}
                      className="btn btn-ghost btn-square btn-sm text-gray-400 hover:text-blue-600 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCategoryToDelete(cat)}
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

      {/* APPEL DES MODAUX */}
      {isAddOpen && <AddCategoryModal onClose={() => setIsAddOpen(false)} />}
      {categoryToEdit && <UpdateCategoryModal category={categoryToEdit} onClose={() => setCategoryToEdit(null)} />}
      {categoryToDelete && <DeleteCategoryModal category={categoryToDelete} onClose={() => setCategoryToDelete(null)} />}
    </div>
  );
}