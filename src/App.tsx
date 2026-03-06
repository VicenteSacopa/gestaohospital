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
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'patients': return <Patients />;
      case 'doctors': return <Doctors />;
      case 'staff': return <Staff />;
      case 'consultations': return <Consultations />;
      case 'reports': return <Reports />;
      case 'prescriptions': return <Prescriptions />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          userName="Dra. Sarah Smith" 
          userRole="Administradora" 
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
