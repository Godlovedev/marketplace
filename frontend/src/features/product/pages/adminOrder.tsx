import { useState } from 'react';
import { useGetOrders } from '../hooks/useGetOrders'; 
import { ClipboardList, Clock, CheckCircle2, XCircle, Layers, Calendar, User, Phone, MapPin, Search, RefreshCw } from 'lucide-react';
import { useUpdateOrderStatus } from '../../shop/cart/hooks/useUpdateOrder';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string; 
  totalPrice: number;
  status: 'PENDING' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string; // 👈 Reçu grâce à ton modèle Prisma
  items: any[];
}

export function AdminOrders() {
  const { orders = [], isLoadingOrder } = useGetOrders(); 
  const { handleSetStatus, isUpdating } = useUpdateOrderStatus();

  // États pour les filtres
  const [filterStatus, setFilterStatus] = useState<'PENDING' | 'DELIVERED' | 'CANCELLED' | 'ALL'>('PENDING');
  const [searchQuery, setSearchQuery] = useState(''); // 👈 État pour la barre de recherche

  // Logique combinée : Filtrage par statut + Recherche textuelle
  const filteredOrders = orders.filter((order: Order) => {
    // 1. Alignement avec les Onglets de Statut
    const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus;

    // 2. Alignement avec la barre de recherche (Nom, Phone, ou ID)
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  if (isLoadingOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <span className="loading loading-spinner loading-lg text-[#1e3a8a]"></span>
        <p className="text-gray-500 font-bold text-sm">Chargement des commandes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-2">
      
      {/* HEADER DE LA PAGE */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="p-2.5 bg-[#1e3a8a] text-white rounded-xl shadow-md">
          <ClipboardList className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-[#1e3a8a] uppercase tracking-wide">Espace Admin — Commandes</h2>
          <p className="text-xs text-gray-500 font-semibold">Gestion des statuts de retrait et suivi temporel</p>
        </div>
      </div>

      {/* BARRE DE FILTRES — ONGLETS DE STATUT */}
      <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
        <button 
          onClick={() => setFilterStatus('PENDING')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${filterStatus === 'PENDING' ? 'bg-[#eab308] text-[#1e3a8a] shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <Clock className="w-4 h-4" /> En Attente ({orders.filter((o: Order) => o.status === 'PENDING').length})
        </button>
        <button 
          onClick={() => setFilterStatus('DELIVERED')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${filterStatus === 'DELIVERED' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <CheckCircle2 className="w-4 h-4" /> Livrées ({orders.filter((o: Order) => o.status === 'DELIVERED').length})
        </button>
        <button 
          onClick={() => setFilterStatus('CANCELLED')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${filterStatus === 'CANCELLED' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <XCircle className="w-4 h-4" /> Annulées ({orders.filter((o: Order) => o.status === 'CANCELLED').length})
        </button>
        <button 
          onClick={() => setFilterStatus('ALL')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${filterStatus === 'ALL' ? 'bg-[#1e3a8a] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <Layers className="w-4 h-4" /> Toutes ({orders.length})
        </button>
      </div>

      {/* BARRE DE RECHERCHE DYNAMIQUE */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Rechercher par nom, téléphone ou ID de commande..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-xs text-gray-800 focus:border-[#1e3a8a] outline-none transition-all font-medium shadow-sm"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 text-[10px] font-bold"
          >
            EFFACER
          </button>
        )}
      </div>

      {/* LISTE DES CARTES DE COMMANDES */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order: Order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row md:items-stretch transition-all hover:border-gray-200">
              
              {/* Infos Client & Dates (Gauche) */}
              <div className="p-4 flex-1 space-y-3 border-b md:border-b-0 md:border-r border-gray-100 bg-[#f8fafc]/50 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-xs text-[#1e3a8a] truncate bg-[#1e3a8a]/5 px-2 py-1 rounded-md">ID: {order.id}</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-700 font-medium">
                    <p className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-gray-400" /><strong className="font-bold text-gray-900">{order.customerName}</strong></p>
                    <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gray-400" />{order.customerPhone}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gray-400" />Point : <span className="badge badge-sm font-bold bg-gray-200 border-none text-gray-700 uppercase">{order.pickupLocation}</span></p>
                  </div>
                </div>

                {/* SECTION BLOC DATES (Création vs Action) */}
                <div className="pt-2 border-t border-gray-100/80 space-y-1 text-[10px] font-semibold text-gray-400">
                  <p className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
                    Reçue le : <span className="text-gray-600">{new Date(order.createdAt).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                  </p>
                  
                  {/* On affiche la date de mise à jour uniquement si le statut a changé */}
                  {order.status !== 'PENDING' && (
                    <p className="flex items-center gap-1 text-gray-500 animate-fadeIn">
                      <RefreshCw className="w-3 h-3 text-[#eab308] shrink-0" />
                      {order.status === 'DELIVERED' ? 'Livrée le :' : 'Annulée le :'} <span className="text-gray-700 font-bold">{new Date(order.updatedAt).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Articles Commandés (Milieu) */}
              <div className="p-4 flex-[1.5] space-y-2 flex flex-col justify-center">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Articles commandés</span>
                <div className="space-y-1 max-h-[150px] overflow-y-auto scrollbar-none">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                      <span className="font-bold text-gray-800">{item.product?.name || `Produit #${item.productId}`}</span>
                      <span className="font-black text-[#1e3a8a] bg-[#eab308]/20 px-2 py-0.5 rounded-md">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statuts & Formulaire d'Action (Droite) */}
              <div className="p-4 flex-1 flex flex-col justify-between items-stretch md:items-end gap-4 bg-[#f8fafc]/20">
                <div className="md:text-right">
                  {order.status === 'PENDING' && <span className="badge font-black text-xs p-3 border-none bg-[#eab308]/20 text-[#b88a06]">EN ATTENTE</span>}
                  {order.status === 'DELIVERED' && <span className="badge font-black text-xs p-3 border-none bg-green-100 text-green-700">LIVRÉE</span>}
                  {order.status === 'CANCELLED' && <span className="badge font-black text-xs p-3 border-none bg-red-100 text-red-700">ANNULÉE</span>}
                  
                  {order.totalPrice && (
                    <div className="text-xs font-black text-[#1e3a8a] mt-1">
                      Total : {order.totalPrice.toLocaleString('fr-FR')} FCFA
                    </div>
                  )}
                </div>

                <form 
                  onSubmit={(e) => handleSetStatus(e, order.id)} 
                  className="w-full text-left"
                >
                  <select 
                    name="status" 
                    defaultValue={order.status}
                    disabled={isUpdating}
                    onChange={(e) => e.currentTarget.form?.requestSubmit()} 
                    className="select select-sm select-bordered w-full bg-white text-xs font-bold text-gray-700 border-gray-200 focus:border-[#1e3a8a] focus:outline-none shadow-sm"
                  >
                    <option value="PENDING">⌛ En Attente</option>
                    <option value="DELIVERED">✅ Livrée / Payée</option>
                    <option value="CANCELLED">❌ Annulée</option>
                  </select>
                </form>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 space-y-2">
            <ClipboardList className="w-12 h-12 text-gray-200 mx-auto" />
            <p className="text-gray-500 font-bold text-sm">Aucune commande trouvée</p>
            <p className="text-gray-400 text-xs px-8">
              Aucun résultat ne correspond à votre recherche "{searchQuery}" dans l'onglet actuel.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}