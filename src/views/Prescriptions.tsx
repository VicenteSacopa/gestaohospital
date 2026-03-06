import React from 'react';
import { 
  Printer, 
  Plus, 
  Search, 
  User, 
  ShieldCheck,
  Eye,
  Trash2,
  Bell,
  Grid
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Prescriptions() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Serviços Médicos</span>
          <span>{'>'}</span>
          <span className="text-hospital-blue font-medium">Geração de Receitas Médicas</span>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar pacientes, receitas..." 
              className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Grid className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Geração de Receitas Médicas</h1>
          <p className="text-slate-500">Emissão de prescrições digitais com integração automatizada de registros.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50">
            <Printer className="w-5 h-5" />
            Imprimir
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-hospital-blue text-white rounded-xl text-sm font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-5 h-5" />
            Gerar Receita
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Patient & Doctor Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-hospital-blue p-2 rounded-lg">
                <User className="text-white w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider text-[11px]">Informações do Paciente e Médico</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Paciente</label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 appearance-none">
                    <option>Johnathan Doe (P-99283)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Médico Responsável</label>
                <input type="text" value="Dra. Sarah Jenkins" readOnly className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Diagnóstico / Motivo da Consulta</label>
              <textarea 
                placeholder="Insira os detalhes do diagnóstico clínico..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 min-h-[120px]"
              ></textarea>
            </div>
          </motion.div>

          {/* Medications */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-hospital-blue p-2 rounded-lg">
                  <Plus className="text-white w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider text-[11px]">Medicamentos e Dosagem</h2>
              </div>
              <button className="text-hospital-blue text-sm font-bold flex items-center gap-2 hover:underline">
                <Plus className="w-4 h-4" />
                Adicionar Linha
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Medicamentos</th>
                    <th className="pb-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dosagem</th>
                    <th className="pb-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Frequência</th>
                    <th className="pb-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duração</th>
                    <th className="pb-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr>
                    <td className="py-4 text-sm text-slate-900">Amoxicilina 500mg</td>
                    <td className="py-4 text-sm text-slate-600">1 Cápsula</td>
                    <td className="py-4 text-sm text-slate-600">TID (3 vezes ao dia)</td>
                    <td className="py-4 text-sm text-slate-600">7 Dias</td>
                    <td className="py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4">
                      <input type="text" placeholder="Adicionar medicamento" className="w-full bg-transparent text-sm outline-none" />
                    </td>
                    <td className="py-4">
                      <input type="text" placeholder="Ex: 10ml" className="w-full bg-transparent text-sm outline-none" />
                    </td>
                    <td className="py-4">
                      <select className="w-full bg-transparent text-sm outline-none text-slate-400">
                        <option>Selecionar Frequência</option>
                      </select>
                    </td>
                    <td className="py-4">
                      <input type="text" placeholder="Ex: 5 dias" className="w-full bg-transparent text-sm outline-none" />
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Special Observations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-hospital-blue p-2 rounded-lg">
                <Eye className="text-white w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider text-[11px]">Observações Especiais e Retorno</h2>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Observações para o Paciente</label>
              <textarea 
                placeholder="Restrições alimentares, limites de atividade ou instruções especiais..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 min-h-[120px]"
              ></textarea>
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {/* Patient Summary Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Resumo do Paciente</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/patient1/200/200" 
                  alt="Patient" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">Johnathan Doe</p>
                <p className="text-sm text-slate-500">Masculino, 34 Anos</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tipo Sanguíneo</p>
                <p className="text-lg font-bold text-slate-900">A+</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Peso</p>
                <p className="text-lg font-bold text-slate-900">78.5 kg</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alergias Conhecidas</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold">Penicilina</span>
                <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold">Amendoim</span>
              </div>
            </div>

            <button className="w-full py-3 bg-blue-50 text-hospital-blue rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
              Ver Histórico Completo
            </button>
          </div>

          {/* Module Stats */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Estatísticas do Módulo</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Emitidas Hoje</p>
                <p className="text-lg font-bold text-hospital-blue">12</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Rascunhos Pendentes</p>
                <p className="text-lg font-bold text-slate-900">3</p>
              </div>
            </div>
            <p className="mt-8 text-xs text-slate-400 italic">
              Última receita gerada para "Jane Smith" há 14 min.
            </p>
          </div>

          {/* Digital Signature */}
          <div className="bg-slate-900 p-8 rounded-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-hospital-blue/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <ShieldCheck className="w-8 h-8 text-hospital-blue mb-4" />
            <h3 className="text-lg font-bold mb-2">Assinatura Digital Habilitada</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Todas as receitas geradas são assinadas criptograficamente para verificação em farmácias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
