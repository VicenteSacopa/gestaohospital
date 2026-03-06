import React from 'react';
import { Search, Bell, LogOut, User } from 'lucide-react';

interface TopbarProps {
  userName: string;
  userRole: string;
  onLogout: () => void;
}

export default function Topbar({ userName, userRole, onLogout }: TopbarProps) {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-hospital-blue transition-colors" />
          <input 
            type="text" 
            placeholder="Pesquisar pacientes, registros..." 
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">{userName}</p>
            <p className="text-xs text-slate-500">{userRole}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
             <img 
               src="https://picsum.photos/seed/doctor/100/100" 
               alt="User" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
