export type View = 'login' | 'dashboard' | 'patients' | 'doctors' | 'staff' | 'consultations' | 'reports' | 'prescriptions' | 'inventory' | 'treasury' | 'activity' | 'users' | 'settings';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  bloodType: string;
  email: string;
  lastVisit?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  licenseNumber: string;
  schedule: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  admissionDate: string;
  status: 'Ativo' | 'Licença' | 'Inativo';
}

export interface Consultation {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: 'Confirmado' | 'Marcada' | 'Concluída' | 'Cancelada';
}

export interface ActivityLog {
  id: string;
  date: string;
  time: string;
  department: string;
  activityType: string;
  assignedTeam: string;
  status: 'Concluído' | 'Em Progresso' | 'Agendado';
}
