const API_BASE = '/api';

export const api = {
  patients: {
    list: () => fetch(`${API_BASE}/patients`).then(r => r.json()),
    create: (data: any) => fetch(`${API_BASE}/patients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  },
  doctors: {
    list: () => fetch(`${API_BASE}/doctors`).then(r => r.json()),
    create: (data: any) => fetch(`${API_BASE}/doctors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  },
  staff: {
    list: () => fetch(`${API_BASE}/staff`).then(r => r.json()),
    create: (data: any) => fetch(`${API_BASE}/staff`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  },
  consultations: {
    list: () => fetch(`${API_BASE}/consultations`).then(r => r.json()),
    create: (data: any) => fetch(`${API_BASE}/consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  },
  stats: {
    get: () => fetch(`${API_BASE}/reports/stats`).then(r => r.json()),
  },
  inventory: {
    list: () => fetch(`${API_BASE}/inventory`).then(r => r.json()),
    create: (data: any) => fetch(`${API_BASE}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  },
  treasury: {
    list: () => fetch(`${API_BASE}/treasury`).then(r => r.json()),
    create: (data: any) => fetch(`${API_BASE}/treasury`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  },
  tasks: {
    list: () => fetch(`${API_BASE}/tasks`).then(r => r.json()),
  },
  users: {
    list: () => fetch(`${API_BASE}/users`).then(r => r.json()),
    login: (username: string, password: string) => fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then(r => r.json()),
    create: (data: any) => fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  },
  activityLogs: {
    list: () => fetch(`${API_BASE}/activity-logs`).then(r => r.json()),
  }
};
