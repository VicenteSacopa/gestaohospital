import React from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  Stethoscope,
  UserPlus
} from 'lucide-react';
import { motion } from 'motion/react';

const doctors = [
  { id: 'MD-4502', name: 'Dr. Michael Chen', specialty: 'Cardiologia', phone: '+55 (11) 9022-1143', email: 'm.chen@hospital.com', initial: 'MC' },
  { id: 'MD-4518', name: 'Dra. Elena Rodriguez', specialty: 'Pediatria', phone: '+55 (11) 2344-5588', email: 'e.rodriguez@hospital.com', initial: 'ER' },
  { id: 'MD-4522', name: 'Dr. James Wilson', specialty: 'Neurologia', phone: '+55 (11) 7777-1212', email: 'j.wilson@hospital.com', initial: 'JW' },
  { id: 'MD-4531', name: 'Dra. Sarah Thompson', specialty: 'Ortopedia', phone: '+55 (11) 4444-9900', email: 's.thompson@hospital.com', initial: 'ST' },
];

export default function Doctors() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Médicos</h1>
          <p className="text-slate-500">Cadastre, atualize e gerencie o diretório do seu corpo clínico.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download className="w-4 h-4" />
            Exportar Diretório
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-hospital-blue text-white rounded-xl text-sm font-medium hover:bg-blue-600 shadow-lg shadow-blue-500/20">
            <Plus className="w-4 h-4" />
            Adicionar em Lote
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
          <h2 className="text-lg font-bold text-slate-900">Cadastrar Médico</h2>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">NOME COMPLETO</label>
            <input type="text" placeholder="Dr. Sarah Johnson" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">ESPECIALIDADE</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100">
              <option>Cardiologia</option>
              <option>Pediatria</option>
              <option>Neurologia</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">NÚMERO DA ORDEM MÉDICA</label>
            <input type="text" placeholder="OM-9988-ABC" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">TELEFONE</label>
            <input type="text" placeholder="+55 (11) 98888-7777" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">EMAIL</label>
            <input type="email" placeholder="s.johnson@hospital.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">HORÁRIO DE ATENDIMENTO</label>
            <input type="text" placeholder="Seg-Sex, 09:00 - 17:00" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="md:col-span-3 flex justify-end gap-4 pt-4">
            <button type="button" className="px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-700">Descartar</button>
            <button type="submit" className="px-8 py-3 bg-hospital-blue text-white rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20">Concluir Cadastro</button>
          </div>
        </form>
      </motion.div>

      {/* Doctors Directory */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Diretório de Médicos</h3>
          <p className="text-xs text-slate-400">Mostrando 1-4 de 24 médicos</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">NOME</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">ESPECIALIDADE</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">TELEFONE</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">EMAIL</th>
                <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {doctors.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                        <img 
                          src={`https://picsum.photos/seed/${d.id}/100/100`} 
                          alt={d.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{d.name}</p>
                        <p className="text-[10px] font-bold text-hospital-blue uppercase tracking-wider">ID: {d.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-600">{d.specialty}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{d.phone}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{d.email}</td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-hospital-blue transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-hospital-blue transition-colors">
                        <Eye className="w-4 h-4" />
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
        <div className="p-6 border-t border-slate-50 flex justify-center gap-2">
          <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-600">Anterior</button>
          <button className="w-8 h-8 rounded-lg bg-hospital-blue text-white text-xs font-bold">1</button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">2</button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">3</button>
          <span className="px-2 text-slate-400">...</span>
          <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">6</button>
          <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-600">Próximo</button>
        </div>
      </div>
    </div>
  );
}
