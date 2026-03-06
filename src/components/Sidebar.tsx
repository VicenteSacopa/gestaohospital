import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Stethoscope, 
  FileText, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Package,
  Wallet,
  Activity,
  UserCircle,
  Briefcase,
  UserCog,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuGroups = [
    {
      title: 'Principal',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      title: 'Área Clínica',
      items: [
        { id: 'patients', label: 'Pacientes', icon: Users },
        { id: 'consultations', label: 'Consultas', icon: Calendar },
        { id: 'doctors', label: 'Corpo Médico', icon: Stethoscope },
        { id: 'prescriptions', label: 'Receitas', icon: ClipboardList },
      ]
    },
    {
      title: 'Administração',
      items: [
        { id: 'staff', label: 'Staff', icon: Briefcase },
        { id: 'inventory', label: 'Logística', icon: Package },
        { id: 'treasury', label: 'Tesouraria', icon: Wallet },
      ]
    },
    {
      title: 'Análises',
      items: [
        { id: 'reports', label: 'Relatórios', icon: FileText },
        { id: 'activity', label: 'Actividade', icon: Activity },
      ]
    }
  ];

  const secondaryItems = [
    { id: 'users', label: 'Utilizadores', icon: UserCog },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? '80px' : '280px' }}
      className="bg-slate-900 text-slate-400 h-screen sticky top-0 flex flex-col transition-all duration-300 ease-in-out z-50 border-r border-slate-800"
    >
      <div className="p-6 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-hospital-blue rounded-lg flex items-center justify-center">
                <Activity className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-white font-bold text-sm leading-none tracking-tight">HM Chibia</h1>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Angola</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            {!isCollapsed && (
              <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id as View)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                    currentView === item.id 
                      ? "bg-hospital-blue text-white shadow-lg shadow-blue-500/20" 
                      : "hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 shrink-0",
                    currentView === item.id ? "text-white" : "text-slate-500 group-hover:text-white"
                  )} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-2">
          {!isCollapsed && (
            <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Sistema
            </p>
          )}
          <div className="space-y-1">
            {secondaryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as View)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                  currentView === item.id 
                    ? "bg-hospital-blue text-white shadow-lg shadow-blue-500/20" 
                    : "hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 shrink-0",
                  currentView === item.id ? "text-white" : "text-slate-500 group-hover:text-white"
                )} />
                {!isCollapsed && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        {!isCollapsed && (
          <div className="mb-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <p className="text-[10px] font-bold text-hospital-blue uppercase tracking-wider mb-1">Suporte</p>
            <p className="text-[11px] text-slate-400 mb-3">Precisa de ajuda?</p>
            <button className="w-full bg-hospital-blue text-white py-2 rounded-xl text-[11px] font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-3 h-3" />
              Contatar
            </button>
          </div>
        )}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 hover:text-rose-500 transition-all group">
          <LogOut className="w-5 h-5 shrink-0 group-hover:text-rose-500" />
          {!isCollapsed && <span className="text-sm font-medium">Sair</span>}
        </button>
      </div>
    </motion.aside>
  );
}
