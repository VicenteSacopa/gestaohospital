import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut, 
  Stethoscope,
  Briefcase,
  UserCog,
  HelpCircle,
  Phone
} from 'lucide-react';
import { View } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Pacientes', icon: Users },
    { id: 'doctors', label: 'Médicos', icon: Stethoscope },
    { id: 'staff', label: 'Funcionários', icon: Briefcase },
    { id: 'consultations', label: 'Consultas', icon: Calendar },
    { id: 'prescriptions', label: 'Receitas', icon: FileText },
    { id: 'reports', label: 'Relatórios', icon: FileText },
  ];

  const secondaryItems = [
    { id: 'users', label: 'Utilizadores', icon: UserCog },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-hospital-blue p-2 rounded-lg">
          <Stethoscope className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-slate-900 leading-none text-sm">HM Chibia</h1>
          <p className="text-[10px] text-slate-500 mt-1">Hospital Municipal</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              currentView === item.id 
                ? "bg-blue-50 text-hospital-blue font-medium" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              currentView === item.id ? "text-hospital-blue" : "text-slate-400 group-hover:text-slate-600"
            )} />
            {item.label}
          </button>
        ))}

        <div className="pt-8 pb-2 px-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sistema</p>
        </div>

        {secondaryItems.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
          >
            <item.icon className="w-5 h-5 text-slate-400" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <p className="text-[10px] font-bold text-hospital-blue uppercase tracking-wider mb-1">Suporte</p>
          <p className="text-xs text-slate-600 mb-3">Precisa de ajuda com o sistema?</p>
          <button className="w-full bg-hospital-blue text-white py-2 rounded-xl text-xs font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
            <Phone className="w-3 h-3" />
            Contatar Suporte
          </button>
        </div>
      </div>
    </aside>
  );
}
