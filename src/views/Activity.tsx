import React, { useEffect, useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter,
  User,
  Calendar,
  CheckSquare,
  Square
} from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../services/api';

export default function ActivityView() {
  const [logs, setLogs] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [logsData, tasksData] = await Promise.all([
        api.activityLogs.list(),
        api.tasks.list()
      ]);
      setLogs(logsData);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Actividade e Tarefas</h1>
        <p className="text-slate-500">Monitoramento de acções e gestão de pendentes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tasks Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <CheckCircle2 className="text-white w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Minhas Tarefas</h3>
            </div>
            <button className="text-xs font-bold text-hospital-blue hover:underline">Ver Todas</button>
          </div>
          <div className="p-6 space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-all cursor-pointer">
                <button className="mt-1 text-slate-400 group-hover:text-hospital-blue">
                  {task.status === 'Concluído' ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-bold ${task.status === 'Concluído' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                      {task.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      task.priority === 'Alta' ? 'bg-rose-100 text-rose-600' : 
                      task.priority === 'Média' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{task.description}</p>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {task.dueDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Logs Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-hospital-blue p-2 rounded-lg">
                <Activity className="text-white w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Logs do Sistema</h3>
            </div>
            <button className="text-xs font-bold text-hospital-blue hover:underline">Exportar Logs</button>
          </div>
          <div className="p-6">
            <div className="relative space-y-6 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {logs.map((log) => (
                <div key={log.id} className="relative pl-10">
                  <div className="absolute left-0 top-1 w-9 h-9 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center z-10">
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-slate-900">{log.action}</p>
                      <span className="text-[10px] font-bold text-slate-400">{new Date(log.timestamp).toLocaleTimeString('pt-AO')}</span>
                    </div>
                    <p className="text-xs text-slate-500">{log.details}</p>
                    <p className="text-[10px] font-bold text-hospital-blue uppercase mt-1 tracking-widest">
                      {new Date(log.timestamp).toLocaleDateString('pt-AO')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
