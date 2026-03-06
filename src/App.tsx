import React, { useState } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Patients from './views/Patients';
import Doctors from './views/Doctors';
import Staff from './views/Staff';
import Consultations from './views/Consultations';
import Reports from './views/Reports';
import Prescriptions from './views/Prescriptions';
import Inventory from './views/Inventory';
import Treasury from './views/Treasury';
import ActivityView from './views/Activity';
import UsersView from './views/Users';
import { motion, AnimatePresence } from 'motion/react';
import { Lock } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const handleLogin = (userData: any) => setUser(userData);
  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    // Permission guard
    if (!user.permissions.includes(currentView) && currentView !== 'dashboard') {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="bg-rose-50 p-4 rounded-full mb-4">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Acesso Restrito</h2>
          <p className="text-slate-500 max-w-xs mx-auto mt-2">
            Não tem permissão para aceder a esta área. Contacte o administrador do sistema.
          </p>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="mt-6 px-6 py-2 bg-hospital-blue text-white rounded-xl font-bold text-sm"
          >
            Voltar ao Dashboard
          </button>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'patients': return <Patients />;
      case 'doctors': return <Doctors />;
      case 'staff': return <Staff />;
      case 'consultations': return <Consultations />;
      case 'reports': return <Reports />;
      case 'prescriptions': return <Prescriptions />;
      case 'inventory': return <Inventory />;
      case 'treasury': return <Treasury />;
      case 'activity': return <ActivityView />;
      case 'users': return <UsersView />;
      case 'settings': return <div className="p-8"><h1 className="text-2xl font-bold">Configurações</h1><p className="text-slate-500">Funcionalidade em desenvolvimento</p></div>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        permissions={user.permissions}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          userName={user.name} 
          userRole={user.role} 
          onLogout={handleLogout} 
        />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
