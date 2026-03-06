import React from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  Users,
  Activity,
  DollarSign,
  Bell,
  HelpCircle
} from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { label: 'Novos Pacientes', value: '1.284', change: '+12%', icon: Users, color: 'blue' },
  { label: 'Consultas', value: '3.592', change: '+5.4%', icon: Calendar, color: 'purple' },
  { label: 'Admissões de Emergência', value: '412', change: '-2.1%', icon: Activity, color: 'orange' },
  { label: 'Receita', value: 'R$ 142k', change: '+8.7%', icon: DollarSign, color: 'emerald' },
];

const logs = [
  { id: '#ACT-9902', time: '24 Out, 2023 - 09:15 AM', dept: 'Cardiologia', type: 'Consulta Inicial', team: 'Dr. Robert Chen', status: 'Concluído' },
  { id: '#ACT-9903', time: '24 Out, 2023 - 10:30 AM', dept: 'Radiologia', type: 'Exame de Ressonância Magnética - Lombar', team: 'Téc. Sarah J.', status: 'Em Progresso' },
  { id: '#ACT-9904', time: '24 Out, 2023 - 11:00 AM', dept: 'Clínica Geral', type: 'Alta de Paciente', team: 'Enf. Emily Watts', status: 'Agendado' },
];

export default function Reports() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Relatórios de Atividade</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar relatórios..." 
              className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Análises e Insights</h2>
            <p className="text-slate-500">Revise dados operacionais em tempo real e métricas de desempenho hospitalar.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">
              <FileText className="w-4 h-4" />
              Exportar Excel
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-hospital-blue text-white rounded-xl text-sm font-medium hover:bg-blue-600 shadow-lg shadow-blue-500/20">
              <Download className="w-4 h-4" />
              Exportar PDF
            </button>
          </div>
        </div>

        <div className="flex gap-8 border-b border-slate-100 mb-8">
          {['Pacientes Cadastrados', 'Consultas por Período', 'Consultas por Médico', 'Atividade Hospitalar'].map((tab, i) => (
            <button 
              key={tab}
              className={`pb-4 text-sm font-medium transition-all relative ${i === 3 ? 'text-hospital-blue' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab}
              {i === 3 && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-hospital-blue" />}
            </button>
          ))}
        </div>

        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 mb-10">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Parâmetros de Filtro</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600">PERÍODO DE DATA</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100">
                <option>Últimos 30 Dias</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600">DEPARTAMENTO</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100">
                <option>Todos Departamentos</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600">NÍVEL DA EQUIPE</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100">
                <option>Toda Equipe</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.change} desde o último mês
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Log de Atividade Hospitalar</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400">
                <Activity className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID DE REFERÊNCIA</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATA E HORA</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">DEPARTAMENTO</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">TIPO DE ATIVIDADE</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">EQUIPE DESIGNADA</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-hospital-blue">{log.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{log.time}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{log.dept}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{log.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{log.team}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        log.status === 'Concluído' ? 'bg-emerald-50 text-emerald-600' :
                        log.status === 'Em Progresso' ? 'bg-blue-50 text-blue-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
