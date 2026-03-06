import React from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Filter, 
  Edit2, 
  Trash2, 
  Users,
  UserPlus
} from 'lucide-react';
import { motion } from 'motion/react';

const patients = [
  { id: '#PT-4402', name: 'Sarah Mitchell', email: 'sarah.m@example.com', age: 28, gender: 'F', phone: '(555) 123-4567', bloodType: 'O+', initial: 'SM' },
  { id: '#PT-4403', name: 'Robert King', email: 'robert.king@email.org', age: 45, gender: 'M', phone: '(555) 987-6543', bloodType: 'A-', initial: 'RK' },
  { id: '#PT-4404', name: 'Linda White', email: 'l.white@domain.com', age: 62, gender: 'F', phone: '(555) 555-0199', bloodType: 'B+', initial: 'LW' },
  { id: '#PT-4405', name: 'David Chen', email: 'dchen@hospital.sys', age: 34, gender: 'M', phone: '(555) 234-5678', bloodType: 'AB+', initial: 'DC' },
  { id: '#PT-4406', name: 'Alice Johnson', email: 'alice.j@provider.net', age: 19, gender: 'F', phone: '(555) 444-3322', bloodType: 'O-', initial: 'AJ' },
];

export default function Patients() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Pacientes</h1>
          <p className="text-slate-500">Directório centralizado para registos e cadastro de pacientes</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-hospital-blue text-white rounded-xl text-sm font-medium hover:bg-blue-600 shadow-lg shadow-blue-500/20">
            <Plus className="w-4 h-4" />
            Registo Rápido
          </button>
        </div>
      </div>

      {/* Registration Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-hospital-blue p-2 rounded-lg">
            <UserPlus className="text-white w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Cadastro de Paciente</h2>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700">Nome Completo</label>
            <input type="text" placeholder="João Silva" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Data de Nascimento</label>
            <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Sexo</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100">
              <option>Seleccionar Sexo</option>
              <option>Masculino</option>
              <option>Feminino</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Telefone</label>
            <input type="text" placeholder="+244 900 000 000" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Tipo Sanguíneo</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100">
              <option>Seleccionar Tipo</option>
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Contacto de Emergência</label>
            <input type="text" placeholder="Nome / Telefone" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="flex items-end gap-4">
            <button type="button" className="flex-1 py-3 text-sm font-bold text-slate-500 hover:text-slate-700">Limpar Formulário</button>
            <button type="submit" className="flex-[2] bg-hospital-blue text-white py-3 rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20">Registar Paciente</button>
          </div>
        </form>
      </motion.div>

      {/* Patients Directory */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-hospital-blue p-2 rounded-lg">
              <Users className="text-white w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Directório de Pacientes</h3>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-400">A mostrar 5 de 128 pacientes</p>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">{'<'}</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-hospital-blue text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 text-xs">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 text-xs">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">{'>'}</button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">NOME</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">IDADE/SEXO</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">TELEFONE</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">TIPO SANGUÍNEO</th>
                <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 text-xs font-bold text-slate-400">{p.id}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-hospital-blue flex items-center justify-center text-xs font-bold">
                        {p.initial}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-600">{p.age} / {p.gender}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{p.phone}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      p.bloodType.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {p.bloodType}
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
  );
}
