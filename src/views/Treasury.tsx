import React, { useEffect, useState } from 'react';
import { 
  Wallet, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft,
  CreditCard,
  Banknote,
  Download,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../services/api';

export default function Treasury() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await api.treasury.list();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = transactions
    .filter(t => t.type === 'Pagamento')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão Financeira e Tesouraria</h1>
          <p className="text-slate-500">Controle de pagamentos, multicaixa e depósitos</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-hospital-blue text-white rounded-xl text-sm font-medium hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all">
            <Plus className="w-4 h-4" />
            Novo Pagamento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Wallet className="w-6 h-6 text-hospital-blue" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Receita</p>
              <p className="text-xl font-bold text-slate-900">{totalRevenue.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <CreditCard className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Multicaixa</p>
              <p className="text-xl font-bold text-slate-900">45%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-xl">
              <Banknote className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Numerário</p>
              <p className="text-xl font-bold text-slate-900">30%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <ArrowUpRight className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Depósitos</p>
              <p className="text-xl font-bold text-slate-900">25%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-hospital-blue p-2 rounded-lg">
              <Wallet className="text-white w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Transacções Recentes</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar transacção..." 
                className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 w-64"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 transition-all">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATA</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">PACIENTE</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">MÉTODO</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">VALOR</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">ESTADO</th>
                <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <p className="text-sm font-bold text-slate-900">{new Date(t.date).toLocaleDateString('pt-AO')}</p>
                    <p className="text-[10px] text-slate-400">{new Date(t.date).toLocaleTimeString('pt-AO')}</p>
                  </td>
                  <td className="px-8 py-4">
                    <p className="text-sm font-bold text-slate-900">{t.patientName || 'N/A'}</p>
                    <p className="text-[10px] text-slate-400">{t.description}</p>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-sm text-slate-600 font-medium flex items-center gap-2">
                      {t.method === 'Multicaixa' ? <CreditCard className="w-4 h-4 text-emerald-500" /> : <Banknote className="w-4 h-4 text-orange-500" />}
                      {t.method}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <p className="text-sm font-bold text-slate-900">{t.amount.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</p>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {t.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-hospital-blue transition-colors">
                      <Download className="w-4 h-4" />
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
