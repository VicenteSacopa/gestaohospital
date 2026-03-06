import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Filter, 
  Calendar as CalendarIcon, 
  Clock, 
  Edit2, 
  XCircle, 
  History,
  Eye,
  Bell,
  Moon
} from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../services/api';

export default function Consultations() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    observations: '',
    status: 'Marcada'
  });

  const fetchData = () => {
    api.consultations.list().then(setConsultations);
    api.patients.list().then(setPatients);
    api.doctors.list().then(setDoctors);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.consultations.create(formData).then(() => {
      fetchData();
      setFormData({
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        observations: '',
        status: 'Marcada'
      });
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Marcação de Consultas</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar consultas..." 
              className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 bg-slate-900 text-white rounded-xl">
            <Moon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* New Consultation Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-hospital-blue p-2 rounded-lg">
            <Plus className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Agendar Nova Consulta</h2>
            <p className="text-sm text-slate-500">Insira os detalhes do paciente e do médico para agendar uma consulta.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Paciente</label>
            <select 
              required
              value={formData.patientId}
              onChange={(e) => setFormData({...formData, patientId: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Buscar paciente...</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Médico</label>
            <select 
              required
              value={formData.doctorId}
              onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Selecionar Médico</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Data da Consulta</label>
            <div className="relative">
              <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:ring-2 focus:ring-blue-100" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Hora</label>
            <div className="relative">
              <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="time" 
                required
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:ring-2 focus:ring-blue-100" 
              />
            </div>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-hospital-blue text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
              <CalendarIcon className="w-4 h-4" />
              Agendar Consulta
            </button>
          </div>
          <div className="md:col-span-3 space-y-2">
            <label className="text-sm font-semibold text-slate-700">Observações</label>
            <textarea 
              value={formData.observations}
              onChange={(e) => setFormData({...formData, observations: e.target.value})}
              placeholder="Paciente relata dor abdominal intensa há 3 dias..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 min-h-[100px]"
            ></textarea>
          </div>
        </form>
      </motion.div>

      {/* Appointments List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Próximas Consultas</h3>
            <p className="text-sm text-slate-500">Visão geral de todas as visitas médicas agendadas para hoje e os próximos 7 dias.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Filter className="w-4 h-4" />
              Filtrar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paciente</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Médico</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hora</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estado</th>
                <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {consultations.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-hospital-blue flex items-center justify-center text-xs font-bold">
                        {c.patientName?.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-slate-900">{c.patientName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-600">{c.doctorName}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{c.date}</td>
                  <td className="px-8 py-4 text-sm text-slate-600 font-medium">{c.time}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      c.status === 'Marcada' ? 'bg-blue-50 text-blue-600' :
                      c.status === 'Concluída' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {c.status === 'Concluída' ? (
                        <button className="p-2 text-slate-400 hover:text-hospital-blue transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      ) : c.status === 'Cancelada' ? (
                        <button className="p-2 text-slate-400 hover:text-hospital-blue transition-colors">
                          <History className="w-4 h-4" />
                        </button>
                      ) : (
                        <>
                          <button className="p-2 text-slate-400 hover:text-hospital-blue transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
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
