import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full bg-white rounded-[32px] shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col md:flex-row min-h-[600px]"
      >
        {/* Left Side - Hero */}
        <div className="md:w-1/2 relative overflow-hidden bg-hospital-blue">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
            alt="Hospital Hallway" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-hospital-blue/80 to-blue-900/90"></div>
          
          <div className="relative h-full p-12 flex flex-col justify-between text-white">
            <div>
              <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center mb-8">
                <Briefcase className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-bold leading-tight mb-6">
                Hospital Municipal da Chibia
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed max-w-md">
                Sistema de Gestão Administrativa. Faça a gestão eficiente dos cuidados aos pacientes e operações hospitalares.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-100">
                <ShieldCheck className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-medium">Acesso Seguro</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <Lock className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-medium">Dados Protegidos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Login do Portal</h2>
            <p className="text-slate-500 mb-10">
              Bem-vindo. Por favor, insira as suas credenciais para aceder ao painel administrativo.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-hospital-blue transition-colors" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@hospital.pt"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 focus:border-hospital-blue transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700">Palavra-passe</label>
                  <button type="button" className="text-xs font-semibold text-hospital-blue hover:underline">
                    Esqueceu-se da senha?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-hospital-blue transition-colors" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 focus:border-hospital-blue transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-slate-300 text-hospital-blue focus:ring-hospital-blue"
                />
                <label htmlFor="remember" className="text-sm text-slate-600">Lembrar sessão</label>
              </div>

              <button 
                type="submit"
                className="w-full bg-hospital-blue text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 active:scale-[0.98]"
              >
                Entrar
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Dificuldades ao entrar? Contacte o suporte de TI pelo ramal <span className="font-bold text-hospital-blue">4500</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <footer className="absolute bottom-8 text-center w-full">
        <p className="text-xs text-slate-400">
          © 2024 Hospital Municipal da Chibia. Todos os direitos reservados.
        </p>
        <div className="mt-2 flex justify-center gap-4 text-xs text-slate-400">
          <button className="hover:text-slate-600">Política de Privacidade</button>
          <span>|</span>
          <button className="hover:text-slate-600">Termos de Segurança</button>
        </div>
      </footer>
    </div>
  );
}
