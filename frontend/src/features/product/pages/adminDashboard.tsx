import { Link } from "react-router";
import { useDashboardStats } from "../hooks/useAdminDashboardStats";

export default function DashboardAdminPage() {
  const { stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-slate-600">
            Mise à jour de vos indicateurs...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto mt-10">
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-6 py-4 rounded-xl shadow-sm text-center">
          <p className="font-bold text-lg mb-1">⚠️ Une erreur de connexion est survenue</p>
          <p className="text-sm opacity-90">L'affichage des données est temporairement indisponible. Veuillez actualiser la page.</p>
        </div>
      </div>
    );
  }

  const kpi = stats?.kpi || {
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
    deliveredOrders: 0,
    totalProducts: 0,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-slate-50 min-h-screen font-sans">
      
      {/* En-tête de la page */}
      <div className="mb-8 border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-blue-900 tracking-tight">Votre Activité</h1>
        <p className="text-sm text-slate-500 mt-1">
          Suivez en temps réel les performances et la gestion de votre boutique.
        </p>
      </div>

      {/* SECTION 1 : VENTES & REUSSITES */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Finances & Réussites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Carte : Chiffre d'Affaires (Fond blanc, accents Jaunes fixes) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 flex items-center justify-between transition-all hover:scale-[1.01]">
            <div>
              <span className="text-sm font-medium text-slate-500 block">Chiffre d'Affaires encaissé</span>
              <span className="text-3xl font-black text-blue-900 block mt-1">
                {kpi.totalRevenue.toLocaleString('fr-FR')} <span className="text-amber-500 text-xl font-bold">FCFA</span>
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 text-2xl shadow-inner border border-amber-100">
              💵
            </div>
          </div>

          {/* Carte : Livraisons Réussies (Couleur VERTE fixe) */}
          <div className="bg-emerald-50/60 p-6 rounded-2xl shadow-sm border border-emerald-200 flex items-center justify-between transition-all hover:scale-[1.01]">
            <div>
              <span className="text-sm font-medium text-emerald-800 block">Commandes livrées avec succès</span>
              <span className="text-3xl font-black text-emerald-700 block mt-1">
                {kpi.deliveredOrders} <span className="text-sm text-emerald-600/80 font-normal">colis expédiés</span>
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-2xl shadow-md">
              ✅
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2 : FLUX DES COMMANDES */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Suivi du traitement quotidien</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Total des commandes (Couleur BLEUE fixe) */}
          <div className="bg-blue-50/50 p-6 rounded-2xl shadow-sm border border-blue-200 flex items-center justify-between transition-all hover:scale-[1.01]">
            <div>
              <span className="text-sm font-medium text-blue-800 block">Total des commandes reçues</span>
              <span className="text-2xl font-black text-blue-900 block mt-1">
                {kpi.totalOrders} <span className="text-xs text-blue-600 font-normal">au total</span>
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl shadow-sm">
              📋
            </div>
          </div>

          {/* À Préparer (Lien + Couleur JAUNE fixe) */}
          <Link 
            to="/admin/dashboard/orders" 
            className={`p-6 rounded-2xl shadow-sm border flex items-center justify-between transition-all hover:scale-[1.01] cursor-pointer bg-amber-50 border-amber-200`}
          >
            <div>
              <span className="text-sm font-medium text-amber-800 block">En attente de préparation</span>
              <span className={`text-2xl font-black block mt-1 ${kpi.pendingOrders > 0 ? 'text-amber-600 animate-pulse' : 'text-amber-900'}`}>
                {kpi.pendingOrders} <span className="text-xs font-normal text-amber-700">nouveaux colis</span>
              </span>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm ${
              kpi.pendingOrders > 0 ? 'bg-amber-500 text-white animate-bounce' : 'bg-amber-200 text-amber-700'
            }`}>
              📦
            </div>
          </Link>

          {/* Commandes Annulées (Couleur ROUGE fixe) */}
          <div className="bg-red-50/50 p-6 rounded-2xl shadow-sm border border-red-200 flex items-center justify-between transition-all hover:scale-[1.01]">
            <div>
              <span className="text-sm font-medium text-red-800 block">Commandes annulées ou rejetées</span>
              <span className="text-2xl font-black text-red-600 block mt-1">
                {kpi.cancelledOrders} <span className="text-xs text-red-500 font-normal">échecs</span>
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center text-white text-xl shadow-sm">
              ❌
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3 : LE CATALOGUE */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Gestion des Produits</h2>
        
        <Link 
          to="/admin/dashboard/products" 
          className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 flex items-center justify-between max-w-sm transition-all hover:scale-[1.01] cursor-pointer"
        >
          <div>
            <span className="text-sm font-medium text-slate-500 block">Articles visibles par vos clients</span>
            <span className="text-xl font-bold text-blue-900 block mt-1">
              {kpi.totalProducts} articles en ligne
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 text-xl border border-purple-100">
            ✨
          </div>
        </Link>
      </div>

      {/* Message honnête sur l'évolution future */}
      <div className="bg-slate-100 rounded-2xl border border-slate-200 p-4 text-center">
        <p className="text-xs font-medium text-slate-600">
          🛠️ Les graphiques visuels d'évolution des ventes mensuelles feront l'objet d'une future mise à jour de l'application.
        </p>
      </div>

    </div>
  );
}