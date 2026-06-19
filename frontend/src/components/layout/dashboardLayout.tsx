import { ShoppingCart, LayoutDashboard, Package, FolderTree, ShoppingBag, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { Navigate, NavLink, Outlet, useNavigate } from "react-router"

export function DashboardLayout(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false) // De base fermé sur mobile, tu peux changer selon tes préférences
    const navigate = useNavigate()
    
    // Sécurité : Vérification du token
    const token = localStorage.getItem("token")
    if(!token){
        return <Navigate to="/admin/login" replace />
    }

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/admin/login")
    }

    return(
        <div data-theme="light" className="flex h-screen bg-[#f0f4f8] text-[#374151] overflow-hidden relative">
            
            {/* VOILE NOIR TRANSPARENT (Uniquement visible sur mobile quand la Sidebar est ouverte) */}
            {isSidebarOpen && (
                <div 
                    onClick={() => setIsSidebarOpen(false)} 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
                />
            )}

            {/* 1. BARRE LATÉRALE (SIDEBAR RESPONSIVE) */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 bg-[#1e3a8a] text-white flex flex-col h-full transition-all duration-300 shadow-xl shrink-0
                md:static md:translate-x-0
                ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:w-20'}
            `}>
                
                {/* LOGO + Bouton Fermer sur Mobile */}
                <div className="flex justify-between md:justify-center items-center px-4 md:px-0 py-6 select-none border-b border-blue-800/50 h-20 overflow-hidden">
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#1e3a8a] shrink-0 shadow-md">
                            <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                        {/* Affiche le texte si ouvert sur mobile OU si ouvert sur desktop (w-64) */}
                        {(isSidebarOpen || (!isSidebarOpen && window.innerWidth < 768)) && (
                            <div className="flex flex-col text-left leading-none transition-all">
                                <span className="text-lg font-black tracking-wider uppercase">E-Shop</span>
                                <span className="text-[10px] font-bold tracking-widest text-[#eab308] uppercase mt-0.5">Commerce</span>
                            </div>
                        )}
                    </div>

                    {/* Bouton pour fermer la sidebar (uniquement visible sur mobile) */}
                    <button 
                        onClick={() => setIsSidebarOpen(false)} 
                        className="btn btn-ghost btn-circle btn-sm text-white md:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* LIENS DE NAVIGATION */}
                <div className="flex-1 px-4 py-6 overflow-y-auto">
                    <ul className="menu menu-md p-0 gap-1 w-full">
                        <li>
                            <NavLink 
                                to="/admin/dashboard" 
                                end 
                                onClick={() => { if(window.innerWidth < 768) setIsSidebarOpen(false) }}
                                className={({ isActive }) => `flex items-center gap-4 py-3 px-4 rounded-xl font-medium transition-all ${isActive ? 'bg-[#eab308] text-[#1e3a8a] font-bold shadow-md' : 'hover:bg-blue-800 text-blue-100'}`}
                            >
                                <LayoutDashboard className="w-5 h-5 shrink-0" />
                                <span className={`md:hidden ${isSidebarOpen ? 'block!' : ''}`}>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/dashboard/products" 
                                onClick={() => { if(window.innerWidth < 768) setIsSidebarOpen(false) }}
                                className={({ isActive }) => `flex items-center gap-4 py-3 px-4 rounded-xl font-medium transition-all ${isActive ? 'bg-[#eab308] text-[#1e3a8a] font-bold shadow-md' : 'hover:bg-blue-800 text-blue-100'}`}
                            >
                                <Package className="w-5 h-5 shrink-0" />
                                <span className={`md:hidden ${isSidebarOpen ? 'block!' : ''}`}>Produits</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/dashboard/category" 
                                onClick={() => { if(window.innerWidth < 768) setIsSidebarOpen(false) }}
                                className={({ isActive }) => `flex items-center gap-4 py-3 px-4 rounded-xl font-medium transition-all ${isActive ? 'bg-[#eab308] text-[#1e3a8a] font-bold shadow-md' : 'hover:bg-blue-800 text-blue-100'}`}
                            >
                                <FolderTree className="w-5 h-5 shrink-0" />
                                <span className={`md:hidden ${isSidebarOpen ? 'block!' : ''}`}>Catégories</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/dashboard/orders" 
                                onClick={() => { if(window.innerWidth < 768) setIsSidebarOpen(false) }}
                                className={({ isActive }) => `flex items-center gap-4 py-3 px-4 rounded-xl font-medium transition-all ${isActive ? 'bg-[#eab308] text-[#1e3a8a] font-bold shadow-md' : 'hover:bg-blue-800 text-blue-100'}`}
                            >
                                <ShoppingBag className="w-5 h-5 shrink-0" />
                                <span className={`md:hidden ${isSidebarOpen ? 'block!' : ''}`}>Commandes</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* BOUTON DÉCONNEXION */}
                <div className="p-4 border-t border-blue-800/50">
                    <button onClick={handleLogout} className="flex items-center gap-4 py-3 px-4 w-full rounded-xl font-medium text-red-200 hover:bg-red-900/30 hover:text-red-400 transition-all text-left">
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span className={`md:hidden ${isSidebarOpen ? 'block!' : ''}`}>Se déconnecter</span>
                    </button>
                </div>
            </aside>

            {/* 2. ZONE DE CONTENU PRINCIPALE */}
            <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
                
                {/* Barre supérieure (Navbar) */}
                <header className="h-20 bg-white shadow-sm flex items-center justify-between px-4 md:px-6 border-b border-gray-100 shrink-0">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="btn btn-ghost btn-circle text-[#1e3a8a]">
                        <Menu className="w-6 h-6" />
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                            <div className="bg-[#1e3a8a] text-white rounded-full w-10">
                                <span className="text-sm font-bold">AD</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* CONTENU DYNAMIQUE DES PAGES ENFANTS */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}