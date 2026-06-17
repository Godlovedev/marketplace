import { MapPin, HandCoins } from 'lucide-react';

export function ShopHome() {

  const pointsDeRetrait = [
    { lieu: "Grand Marché", desc: "Près du hangar central" },
    { lieu: "Gare Centrale", desc: "Devant le hall d'attente principal" },
    { lieu: "Quartier Administratif", desc: "En face de la poste centrale" }
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci pour votre feedback ! Nous l'avons bien reçu.");
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* SECTION BIENVENUE */}
      <section className="text-center py-8 space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-[#1e3a8a] leading-tight">
          Bienvenue sur notre <span className="text-[#eab308]">Marketplace</span>
        </h1>
        <p className="text-gray-600 md:text-lg">
          Découvrez notre catalogue de produits, passez votre commande en quelques clics et récupérez vos articles en toute sécurité.
        </p>
      </section>

      {/* SECTION LOGISTIQUE (LIVRAISON & PAIEMENT) */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Points de réception */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 space-y-4">
          <div className="flex items-center gap-3 text-[#1e3a8a]">
            <div className="p-3 bg-blue-50 text-[#1e3a8a] rounded-xl border border-blue-100">
              <MapPin />
            </div>
            <h2 className="text-xl font-bold">Nos 3 Points de Réception</h2>
          </div>
          <p className="text-sm text-gray-500">Pour simplifier la récupération, vos colis sont acheminés exclusivement vers ces trois points précis :</p>
          <ul className="space-y-3 pt-2">
            {pointsDeRetrait.map((item, index) => (
              <li key={index} className="flex gap-3 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eab308] text-[#1e3a8a] text-xs font-black mt-0.5 shadow-sm">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-bold text-gray-800">{item.lieu}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mode de paiement */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#1e3a8a]">
              <div className="p-3 bg-blue-50 text-[#1e3a8a] rounded-xl border border-blue-100">
                <HandCoins />
              </div>
              <h2 className="text-xl font-bold">Paiement en Main Propre</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Pas besoin de carte bancaire ou de paiement en ligne. Vous validez votre commande sur le site, et vous payez directement le livreur en espèces lorsque vous récupérez votre produit.
            </p>
            <div className="p-4 bg-amber-50 rounded-xl border border-[#eab308]/40 text-amber-950 text-sm font-medium">
              💡 <span className="font-bold text-[#1e3a8a]">Information :</span> Pensez à préparer l'appoint lors de votre rendez-vous au point de retrait sélectionné.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION FEEDBACK */}
      <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200/80 max-w-xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-gray-800">Votre avis compte !</h2>
          <p className="text-sm text-gray-500">Aidez-nous à améliorer la plateforme en partageant vos suggestions.</p>
        </div>
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-bold text-xs text-gray-600">Nom complet</label>
              {/* Correction de la visibilité des bordures et états de focus */}
              <input 
                type="text" 
                className="w-full bg-[#f8fafc] rounded-xl border border-gray-300 p-3 text-sm text-gray-800 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#eab308]/30 outline-none transition-all shadow-inner" 
                required 
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-xs text-gray-600">Adresse Email</label>
              <input 
                type="email" 
                className="w-full bg-[#f8fafc] rounded-xl border border-gray-300 p-3 text-sm text-gray-800 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#eab308]/30 outline-none transition-all shadow-inner" 
                required 
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label font-bold text-xs text-gray-600">Votre message / feedback</label>
            <textarea 
              className="w-full h-28 bg-[#f8fafc] rounded-xl border border-gray-300 p-3 text-sm text-gray-800 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#eab308]/30 outline-none transition-all shadow-inner resize-none" 
              placeholder="Ex: Ce serait pratique d'avoir un système de recherche par..." 
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#1e3a8a] hover:bg-blue-900 text-white font-black py-3 rounded-xl transition-all shadow-md active:scale-[0.99] border-b-4 border-blue-950 hover:border-blue-900"
          >
            ENVOYER LE FEEDBACK
          </button>
        </form>
      </section>
    </div>
  );
}