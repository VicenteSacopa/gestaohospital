import React, { useEffect, useState } from 'react';
import { 
  UserPlus, 
  Shield, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../services/api';

const ALL_VIEWS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'patients', label: 'Pacientes' },
  { id: 'consultations', label: 'Consultas' },
  { id: 'doctors', label: 'Corpo Médico' },
  { id: 'prescriptions', label: 'Receitas' },
  { id: 'staff', label: 'Staff' },
  { id: 'inventory', label: 'Logística' },
  { id: 'treasury', label: 'Tesouraria' },
  { id: 'reports', label: 'Relatórios' },
  { id: 'activity', label: 'Actividade' },
  { id: 'users', label: 'Utilizadores' },
  { id: 'settings', label: 'Configurações' },
];

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    role: 'Recepcionista',
    permissions: ['dashboard'] as string[]
  });
  const [showPassword, setShowPassword] = useState(false);

  const fetchUsers = () => {
    api.users.list().then(setUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTogglePermission = (viewId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(viewId)
        ? prev.permissions.filter(id => id !== viewId)
        : [...prev.permissions, viewId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.users.create(formData).then(() => {
      fetchUsers();
      setFormData({
        username: '',
        password: '',
        name: '',
        role: 'Recepcionista',
        permissions: ['dashboard']
      });
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Utilizadores</h1>
          <p className="text-slate-500">Controle de acessos e permissões do sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm h-fit"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-hospital-blue p-2 rounded-lg">
              <UserPlus className="text-white w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Novo Utilizador</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nome Completo</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: João Manuel" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="jmanuel" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cargo / Perfil</label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="Administrador">Administrador</option>
                <option value="Médico">Médico</option>
                <option value="Enfermeiro">Enfermeiro</option>
                <option value="Recepcionista">Recepcionista</option>
                <option value="Financeiro">Financeiro</option>
              </select>
            </div>

            <div className="space-y-3 pt-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Permissões de Acesso</label>
              <div className="grid grid-cols-2 gap-2">
                {ALL_VIEWS.map(view => (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => handleTogglePermission(view.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-bold transition-all border ${
                      formData.permissions.includes(view.id)
                        ? 'bg-blue-50 border-hospital-blue text-hospital-blue'
                        : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <Shield className={`w-3 h-3 ${formData.permissions.includes(view.id) ? 'fill-hospital-blue' : ''}`} />
                    {view.label}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full bg-hospital-blue text-white py-4 rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all mt-6">
              Criar Utilizador
            </button>
          </form>
        </motion.div>

        {/* Users List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-hospital-blue p-2 rounded-lg">
                  <Lock className="text-white w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Utilizadores Activos</h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar utilizador..." 
                  className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 w-48"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">UTILIZADOR</th>
                    <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">CARGO</th>
                    <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">PERMISSÕES</th>
                    <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">STATUS</th>
                    <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">AÇÕES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{user.name}</p>
                            <p className="text-[10px] text-slate-400">@{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <span className="text-xs font-medium text-slate-600">{user.role}</span>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {user.permissions.slice(0, 3).map((p: string) => (
                            <span key={p} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[8px] font-bold uppercase">
                              {p}
                            </span>
                          ))}
                          {user.permissions.length > 3 && (
                            <span className="text-[8px] font-bold text-slate-400">+{user.permissions.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          user.status === 'Activo' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-slate-400 hover:text-hospital-blue transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
