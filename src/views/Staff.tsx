import React from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Filter, 
  Edit2, 
  Trash2, 
  Briefcase,
  UserPlus
} from 'lucide-react';
import { motion } from 'motion/react';

const staff = [
  { id: '#STF-8821', name: 'João Davis', role: 'Cirurgião Chefe', dept: 'Cardiologia', phone: '+55 11 95555-0143', email: 'j.davis@medcare.org', admission: '12 Out, 2021', status: 'Ativo', initial: 'JD' },
  { id: '#STF-7742', name: 'Elena Martinez', role: 'Técnica de Laboratório', dept: 'Diagnósticos', phone: '+55 11 95555-0178', email: 'e.martinez@medcare.org', admission: '05 Jan, 2023', status: 'Ativo', initial: 'EM' },
  { id: '#STF-9910', name: 'Marcus Wright', role: 'Assistente Médico', dept: 'Emergência', phone: '+55 11 95555-0122', email: 'm.wright@medcare.org', admission: '15 Mar, 2022', status: 'Licença', initial: 'MW' },
];

export default function Staff() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Gestão de Funcionários</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-hospital-blue text-white rounded-xl text-sm font-medium hover:bg-blue-600 shadow-lg shadow-blue-500/20">
          <Plus className="w-4 h-4" />
          Ação Rápida
        </button>
      </div>

      {/* Registration Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-900 mb-2">Cadastrar Novo Funcionário</h2>
        <p className="text-sm text-slate-500 mb-8">Preencha os dados profissionais para registrar um novo membro da equipe hospitalar.</p>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Nome</label>
            <input type="text" placeholder="Ex: Sarah Jenkins" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Cargo</label>
            <input type="text" placeholder="Ex: Enfermeira Sênior" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Departamento</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100">
              <option>Cardiologia</option>
              <option>Emergência</option>
              <option>Diagnósticos</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Telefone</label>
            <input type="text" placeholder="+55 (11) 00000-0000" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input type="email" placeholder="s.jenkins@hospital.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Data de Admissão</label>
            <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="md:col-span-3 flex justify-end gap-4 pt-4">
            <button type="button" className="px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl">Limpar Formulário</button>
            <button type="submit" className="px-8 py-3 bg-hospital-blue text-white rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20">Registrar Funcionário</button>
          </div>
        </form>
      </motion.div>

      {/* Staff Directory */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por nome, cargo ou ID..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Filter className="w-4 h-4" />
              Filtrar
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">NOME</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">CARGO & DEPARTAMENTO</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">CONTACTO</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">ADMISSÃO</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">STATUS</th>
                <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-hospital-blue flex items-center justify-center text-sm font-bold">
                        {s.initial}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{s.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <p className="text-sm font-bold text-slate-900">{s.role}</p>
                    <p className="text-xs text-slate-500">{s.dept}</p>
                  </td>
                  <td className="px-8 py-4">
                    <p className="text-sm text-slate-600">{s.phone}</p>
                    <p className="text-xs text-slate-400">{s.email}</p>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-600">{s.admission}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      s.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {s.status}
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
        <div className="p-6 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-400">Mostrando 1 a 3 de 128 registros</p>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">{'<'}</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-hospital-blue text-white text-xs font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">{'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
