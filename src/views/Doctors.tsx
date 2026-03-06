import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye,
  Stethoscope,
  UserPlus
} from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../services/api';

export default function Doctors() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    license: '',
    phone: '',
    email: '',
    hours: ''
  });

  const fetchDoctors = () => {
    api.doctors.list().then(setDoctors);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.doctors.create(formData).then(() => {
      fetchDoctors();
      setFormData({
        name: '',
        specialty: '',
        license: '',
        phone: '',
        email: '',
        hours: ''
      });
    });
  };

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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">NOME COMPLETO</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Dr. Sarah Johnson" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">ESPECIALIDADE</label>
            <input 
              type="text" 
              required
              value={formData.specialty}
              onChange={(e) => setFormData({...formData, specialty: e.target.value})}
              placeholder="Ex: Cardiologia" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">NÚMERO DA ORDEM MÉDICA</label>
            <input 
              type="text" 
              required
              value={formData.license}
              onChange={(e) => setFormData({...formData, license: e.target.value})}
              placeholder="OM-9988-ABC" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">TELEFONE</label>
            <input 
              type="text" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+244 900 000 000" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">EMAIL</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="medico@hospital.pt" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">HORÁRIO DE ATENDIMENTO</label>
            <input 
              type="text" 
              value={formData.hours}
              onChange={(e) => setFormData({...formData, hours: e.target.value})}
              placeholder="08:00 - 16:00" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-100" 
            />
          </div>
          <div className="md:col-span-3 flex justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => setFormData({ name: '', specialty: '', license: '', phone: '', email: '', hours: '' })}
              className="px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-700"
            >
              Limpar
            </button>
            <button type="submit" className="px-8 py-3 bg-hospital-blue text-white rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20">Registar Médico</button>
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
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{d.name}</p>
                        <p className="text-[10px] font-bold text-hospital-blue uppercase tracking-widest">{d.license}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-hospital-blue rounded-lg text-xs font-bold">
                      {d.specialty}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-600 font-medium">{d.phone}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{d.email}</td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
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
