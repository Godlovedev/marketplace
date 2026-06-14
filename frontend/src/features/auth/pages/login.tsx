import { Lock, Mail, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin";

export function Login(){

    const {handleLogin, isPending} = useLogin()

    return(
        <>
        <div data-theme="light" className="hero min-h-screen bg-[#dbeafe] p-4">
      
        {/* HERO-CONTENT : Le conteneur interne de DaisyUI qui accueille notre carte */}
        <div className="hero-content w-full max-w-md p-0 justify-center">
            
            {/* La carte blanche du formulaire */}
            <div className="card w-full bg-[#ffffff] shadow-2xl rounded-2xl border border-gray-100">
            <div className="card-body p-8 flex flex-col items-center">
                
                {/* LOGO */}
                <div className="flex items-center gap-3  select-none">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#eab308] text-[#1e3a8a] shadow-sm">
                    <ShoppingCart className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col text-left leading-none">
                    <span className="text-xl font-black tracking-wider text-[#1e3a8a] uppercase">
                    E-Shop
                    </span>
                    <span className="text-xs font-bold tracking-widest text-[#eab308] uppercase mt-0.5">
                    Commerce
                    </span>
                </div>
                </div>

                {/* Titres */}
                <h2 className="text-2xl font-extrabold text-[#1e3a8a] tracking-tight">ADMIN PANEL</h2>
                <p className="text-sm text-[#374151] opacity-70 mt-1 mb-6">Veuillez vous connecter</p>

                {/* Formulaire */}
                <form onSubmit={(e) => {handleLogin(e)}} className="w-full flex flex-col justify-center items-center space-y-4">
                
                {/* Email */}
                <div className="form-control flex justify-center w-full">
                    <label className="input flex-1 input-bordered flex items-center gap-3 bg-[#f0f4f8] border-gray-200 h-12 focus-within:outline-none focus-within:border-[#1e3a8a]">
                    <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                    <input 
                        type="email"
                        name="email"
                        className="grow text-[#374151] placeholder-gray-400" 
                        placeholder="Email" 
                        required 
                    />
                    </label>
                </div>

                {/* Mot de passe */}
                <div className="form-control flex justify-center w-full">
                    <label className="input flex-1 input-bordered flex items-center gap-3 bg-[#f0f4f8] border-gray-200 h-12 focus-within:outline-none focus-within:border-[#1e3a8a]">
                    <Lock className="w-5 h-5 text-gray-400 shrink-0" />
                    <input 
                        type="password"
                        name = "password"
                        className="grow text-[#374151] placeholder-gray-400" 
                        placeholder="Mot de passe" 
                        required 
                    />
                    </label>
                </div>
                {/* Bouton Se Connecter */}
                <div className="form-control flex justify-center w-full pt-2">
                    <button 
                    type="submit" 
                    className="btn h-12 min-h-12 flex-1 border-none bg-[#eab308] hover:bg-[#d4a007] text-[#1e3a8a] font-black tracking-wide text-sm shadow-md transition-all duration-200" disabled={isPending}
                    >
                    SE CONNECTER
                    </button>
                </div>

                {/* Mot de passe oublié */}
                <div className="text-center w-full">
                    <a href="#" className="text-xs font-bold text-[#1e3a8a] hover:underline">
                    Mot de passe oublié ?
                    </a>
                </div>

                </form>

                {/* Séparateur */}
                <div className="divider my-6 text-gray-300 text-xs font-semibold">OU</div>
                
                {/* Lien d'inscription */}
                <p className="text-sm text-[#374151]">
                Pas encore de compte ?{' '}
                <Link to="/register" className="font-bold text-[#1e3a8a] hover:underline">
                    S'inscrire
                </Link>
                </p>

            </div>
            </div>

        </div>
        </div>
        </>
    )
}