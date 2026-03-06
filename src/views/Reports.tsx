import React, { useEffect, useState } from 'react';
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
  HelpCircle,
  Stethoscope,
  Briefcase,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { api } from '../services/api';

const pathologyData = [
  { name: 'Malária', value: 45 },
  { name: 'Gripe/Resfriado', value: 25 },
  { name: 'Hipertensão', value: 15 },
  { name: 'Diabetes', value: 10 },
  { name: 'Outros', value: 5 },
];

const COLORS = ['#1d7df2', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Reports() {
  const [stats, setStats] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    api.stats.get().then(setStats);
    api.activityLogs.list().then(setLogs);
  }, []);

  const statCards = [
    { label: 'Total de Pacientes', value: stats?.patients || '0', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Consultas Realizadas', value: stats?.consultations || '0', change: '+5.4%', icon: Calendar, color: 'purple' },
    { label: 'Corpo Clínico', value: stats?.doctors || '0', change: '+2.1%', icon: Stethoscope, color: 'orange' },
    { label: 'Staff Administrativo', value: stats?.staff || '0', change: '+8.7%', icon: Briefcase, color: 'emerald' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Relatórios e Estatísticas</h1>
          <p className="text-slate-500">Análise de dados hospitalares e indicadores de saúde</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
            <FileText className="w-4 h-4" />
            Exportar Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-hospital-blue text-white rounded-xl text-sm font-medium hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all">
            <Download className="w-4 h-4" />
            Gerar PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-50">
              <stat.icon className="w-6 h-6 text-hospital-blue" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-[10px] font-bold text-emerald-500">
                {stat.change} este mês
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pathologies Distribution */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-rose-50 p-2 rounded-lg">
                <PieChartIcon className="text-rose-500 w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Patologias Frequentes</h3>
            </div>
          </div>
          <div className="h-[300px] w-full flex items-center">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={pathologyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pathologyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-[40%] space-y-4">
              {pathologyData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-600">{entry.name}</span>
                      <span className="text-xs font-bold text-slate-900">{entry.value}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full mt-1">
                      <div className="h-full rounded-full" style={{ width: `${entry.value}%`, backgroundColor: COLORS[index] }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Consultations Trend */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <BarChartIcon className="text-hospital-blue w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Fluxo de Pacientes</h3>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Seg', value: 45 },
                { name: 'Ter', value: 52 },
                { name: 'Qua', value: 38 },
                { name: 'Qui', value: 65 },
                { name: 'Sex', value: 48 },
                { name: 'Sáb', value: 25 },
                { name: 'Dom', value: 15 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" fill="#1d7df2" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-hospital-blue p-2 rounded-lg">
              <Activity className="text-white w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Log de Atividade Hospitalar</h3>
          </div>
          <button className="text-sm font-bold text-hospital-blue hover:underline">Ver Todos os Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATA E HORA</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">ACÇÃO</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">DETALHES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 text-sm font-bold text-hospital-blue">#{log.id}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{new Date(log.timestamp).toLocaleString('pt-AO')}</td>
                  <td className="px-8 py-4 text-sm font-bold text-slate-900">{log.action}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
