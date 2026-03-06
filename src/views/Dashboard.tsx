import React from 'react';
import { 
  Users, 
  Calendar, 
  Stethoscope, 
  TrendingUp, 
  TrendingDown,
  Download,
  Plus,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';

const data = [
  { name: 'JAN', value: 400 },
  { name: 'FEV', value: 300 },
  { name: 'MAR', value: 600 },
  { name: 'ABR', value: 800 },
  { name: 'MAI', value: 500 },
  { name: 'JUN', value: 900 },
];

const stats = [
  { label: 'Total de Pacientes', value: '12.840', change: '+12%', icon: Users, color: 'blue' },
  { label: 'Consultas do Dia', value: '156', change: '+5%', icon: Calendar, color: 'purple' },
  { label: 'Médicos Ativos', value: '84', change: '+2%', icon: Stethoscope, color: 'orange' },
  { label: 'Funcionários', value: '320', change: '-1%', icon: Users, color: 'emerald' },
];

const latestPatients = [
  { name: 'Alice Johnson', time: '2h', type: 'Geral', initial: 'AJ', color: 'bg-blue-100 text-blue-600' },
  { name: 'Robert Wilson', time: '5h', type: 'UTI', initial: 'RW', color: 'bg-slate-900 text-white' },
  { name: 'Emma Davis', time: 'Ontem', type: 'Pediatria', initial: 'ED', color: 'bg-purple-100 text-purple-600' },
  { name: 'Samuel Green', time: 'Ontem', type: 'Radiologia', initial: 'SG', color: 'bg-emerald-100 text-emerald-600' },
];

const appointments = [
  { patient: 'Johnathan Blake', doctor: 'Dr. Sarah Smith', time: '24 Out, 09:30 AM', type: 'Retorno', status: 'Confirmado' },
  { patient: 'Maria Garcia', doctor: 'Dr. Michael Chen', time: '24 Out, 10:15 AM', type: 'Check-up', status: 'Confirmado' },
  { patient: 'David Miller', doctor: 'Dr. Sarah Smith', time: '24 Out, 11:00 AM', type: 'Geral', status: 'Confirmado' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Painel de Controle</h1>
          <p className="text-slate-500">Bem-vindo de volta! Veja o que está acontecendo hoje.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Exportar Relatório
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-hospital-blue text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
            <Plus className="w-4 h-4" />
            Novo Paciente
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Consultas por Mês</h3>
              <p className="text-sm text-slate-500">Tendências de consultas mensais em 2024</p>
            </div>
            <select className="bg-slate-50 border-none rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-blue-100">
              <option>Últimos 6 Meses</option>
              <option>Último Ano</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d7df2" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1d7df2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#1d7df2" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latest Patients */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Últimos Pacientes Cadastrados</h3>
          <div className="space-y-6">
            {latestPatients.map((patient) => (
              <div key={patient.name} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${patient.color}`}>
                    {patient.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{patient.name}</p>
                    <p className="text-xs text-slate-500">Cadastrado há {patient.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  patient.type === 'UTI' ? 'bg-rose-50 text-rose-600' : 
                  patient.type === 'Pediatria' ? 'bg-purple-50 text-purple-600' :
                  patient.type === 'Radiologia' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  {patient.type}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-blue-50 text-hospital-blue rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
            Ver Todos os Pacientes
          </button>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Próximas Consultas</h3>
          <button className="text-sm font-bold text-hospital-blue hover:underline">Ver Agenda</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nome do Paciente</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Médico</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data e Hora</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tipo</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {appointments.map((apt) => (
                <tr key={apt.patient} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4 text-sm font-bold text-slate-900">{apt.patient}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{apt.doctor}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{apt.time}</td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                      {apt.type}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      {apt.status}
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
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
