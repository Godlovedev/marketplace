import { MessageSquare, Truck, Wallet, CheckCircle2 } from 'lucide-react';

export function ShopHome() {

  const etapesCommande = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-amber-600" />,
      titre: "1. Passez commande",
      desc: "Remplissez votre panier et validez vos informations sur le site en laissant votre numéro de téléphone."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-amber-600" />,
      titre: "2. Contact WhatsApp",
      desc: "Le vendeur prend directement contact avec vous sur WhatsApp grâce au numéro fourni."
    },
    {
      icon: <Truck className="w-6 h-6 text-amber-600" />,
      titre: "3. Livraison sur-mesure",
      desc: "Vous discutez et convenez ensemble du lieu de livraison ainsi que des frais d'envoi."
    },
    {
      icon: <Wallet className="w-6 h-6 text-amber-600" />,
      titre: "4. Paiement par dépôt",
      desc: "Les détails du paiement (dépôt ou transfert) sont fixés directement avec le vendeur lors de l'échange."
    }
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci pour votre feedback ! Nous l'avons bien reçu.");
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 md:px-0">
      
      {/* SECTION BIENVENUE */}
      <section className="text-center py-8 space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-[#1e3a8a] leading-tight">
          Bienvenue sur notre <span className="text-[#eab308]">Marketplace</span>
        </h1>
        <p className="text-gray-600 md:text-lg">
          Découvrez notre catalogue de produits, passez votre commande et bénéficiez d'un suivi 100% personnalisé.
        </p>
      </section>

      {/* SECTION INFOS / FONCTIONNEMENT */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-[#1e3a8a]">
            Comment ça <span className="text-[#eab308]">marche ?</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">Un processus simple et direct pour valider vos achats.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {etapesCommande.map((etape, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col space-y-3 relative overflow-hidden group hover:border-[#eab308]/60 transition-all duration-300"
            >
              {/* Badge numéro en arrière-plan jaune très clair */}
              <span className="absolute -top-4 -right-2 text-7xl font-black text-yellow-100/50 select-none pointer-events-none font-sans">
                {index + 1}
              </span>
              
              {/* Box icône modifiée en Jaune */}
              <div className="p-3 bg-amber-100 border border-amber-200 rounded-xl w-fit relative z-10 shadow-sm">
                {etape.icon}
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 pt-1 group-hover:text-[#1e3a8a] transition-colors">
                {etape.titre}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed relative z-10">{etape.desc}</p>
            </div>
          ))}
        </div>

        {/* Note d'information importante */}
        <div className="max-w-3xl mx-auto p-4 bg-amber-50 rounded-xl border-l-4 border-[#eab308] text-amber-950 text-sm font-medium shadow-sm flex items-center justify-center gap-2">
          <span>💡</span>
          <p>
            <span className="font-bold text-[#1e3a8a]">Rappel important :</span> Assurez-vous de renseigner un numéro de téléphone valide lors de la commande afin que l'équipe puisse vous joindre rapidement sur WhatsApp !
          </p>
        </div>
      </section>

      {/* SECTION FEEDBACK */}
      <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200/80 max-w-xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-gray-800">
            Votre avis compte <span className="text-[#eab308]">!</span>
          </h2>
          <p className="text-sm text-gray-500">Aidez-nous à améliorer la plateforme en partageant vos suggestions.</p>
        </div>
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-bold text-xs text-gray-600">Nom complet</label>
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
            className="w-full bg-[#1e3a8a] hover:bg-blue-900 text-white font-black py-3 rounded-xl transition-all shadow-md active:scale-[0.99] border-b-4 border-blue-950 hover:border-b-0 hover:pt-3.5"
          >
            ENVOYER LE FEEDBACK
          </button>
        </form>
      </section>
    </div>
  );
}