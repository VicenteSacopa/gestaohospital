import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("hospital.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    dob TEXT,
    gender TEXT,
    phone TEXT,
    bloodType TEXT,
    emergencyContact TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialty TEXT,
    license TEXT,
    phone TEXT,
    email TEXT,
    hours TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT,
    department TEXT,
    phone TEXT,
    email TEXT,
    admissionDate TEXT,
    status TEXT DEFAULT 'Activo',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS consultations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientId INTEGER,
    doctorId INTEGER,
    date TEXT,
    time TEXT,
    status TEXT DEFAULT 'Marcada',
    observations TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(patientId) REFERENCES patients(id),
    FOREIGN KEY(doctorId) REFERENCES doctors(id)
  );

  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    quantity INTEGER DEFAULT 0,
    minQuantity INTEGER DEFAULT 10,
    unit TEXT,
    lastRestock TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientId INTEGER,
    amount REAL,
    method TEXT, -- Multicaixa, Depósito, Cash
    type TEXT, -- Pagamento, Reembolso
    description TEXT,
    status TEXT DEFAULT 'Concluído',
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(patientId) REFERENCES patients(id)
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT, -- Baixa, Média, Alta
    status TEXT DEFAULT 'Pendente',
    dueDate TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    details TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed data if empty
const patientCount = db.prepare("SELECT count(*) as count FROM patients").get() as { count: number };
if (patientCount.count === 0) {
  const insertPatient = db.prepare("INSERT INTO patients (name, email, dob, gender, phone, bloodType, emergencyContact) VALUES (?, ?, ?, ?, ?, ?, ?)");
  insertPatient.run("Paulo Kassoma", "paulo.k@example.ao", "1985-05-15", "M", "+244 923 000 111", "O+", "Maria Kassoma / +244 912 000 222");
  insertPatient.run("Njinga Mbandi", "njinga.m@example.ao", "1992-11-20", "F", "+244 931 000 333", "A-", "António Mbandi / +244 944 000 444");

  const insertDoctor = db.prepare("INSERT INTO doctors (name, specialty, license, phone, email, hours) VALUES (?, ?, ?, ?, ?, ?)");
  insertDoctor.run("Dr. Manuel dos Santos", "Cardiologia", "AO-12345", "+244 922 111 222", "m.santos@hospital.ao", "08:00 - 16:00");
  insertDoctor.run("Dra. Isabel Panzo", "Pediatria", "AO-98765", "+244 933 333 444", "i.panzo@hospital.ao", "09:00 - 17:00");

  const insertStaff = db.prepare("INSERT INTO staff (name, role, department, phone, email, admissionDate, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
  insertStaff.run("Abel Chivukuvuku", "Administrativo", "Recursos Humanos", "+244 911 555 666", "a.chiv@hospital.ao", "2021-01-10", "Activo");

  const insertInventory = db.prepare("INSERT INTO inventory (name, category, quantity, minQuantity, unit) VALUES (?, ?, ?, ?, ?)");
  insertInventory.run("Luvas Descartáveis", "Consumíveis", 50, 20, "Caixa");
  insertInventory.run("Paracetamol 500mg", "Medicamentos", 100, 30, "Blister");

  const insertTransaction = db.prepare("INSERT INTO transactions (patientId, amount, method, type, description) VALUES (?, ?, ?, ?, ?)");
  insertTransaction.run(1, 15000, "Multicaixa", "Pagamento", "Consulta de Cardiologia");

  const insertTask = db.prepare("INSERT INTO tasks (userId, title, description, priority, dueDate) VALUES (?, ?, ?, ?, ?)");
  insertTask.run(1, "Revisão de Stock", "Verificar validade dos medicamentos na farmácia central", "Alta", "2024-03-10");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper for activity logs
  const addLog = (action: string, details: string) => {
    db.prepare("INSERT INTO activity_logs (action, details) VALUES (?, ?)").run(action, details);
  };

  // API Routes
  app.get("/api/patients", (req, res) => {
    const patients = db.prepare("SELECT * FROM patients").all();
    res.json(patients);
  });

  app.post("/api/patients", (req, res) => {
    const { name, email, dob, gender, phone, bloodType, emergencyContact } = req.body;
    const info = db.prepare("INSERT INTO patients (name, email, dob, gender, phone, bloodType, emergencyContact) VALUES (?, ?, ?, ?, ?, ?, ?)").run(name, email, dob, gender, phone, bloodType, emergencyContact);
    addLog("Paciente Registado", `Paciente ${name} foi adicionado ao sistema.`);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/doctors", (req, res) => {
    const doctors = db.prepare("SELECT * FROM doctors").all();
    res.json(doctors);
  });

  app.post("/api/doctors", (req, res) => {
    const { name, specialty, license, phone, email, hours } = req.body;
    const info = db.prepare("INSERT INTO doctors (name, specialty, license, phone, email, hours) VALUES (?, ?, ?, ?, ?, ?)").run(name, specialty, license, phone, email, hours);
    addLog("Médico Registado", `Dr(a). ${name} (${specialty}) foi adicionado(a) ao corpo clínico.`);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/staff", (req, res) => {
    const staff = db.prepare("SELECT * FROM staff").all();
    res.json(staff);
  });

  app.post("/api/staff", (req, res) => {
    const { name, role, department, phone, email, status } = req.body;
    const info = db.prepare("INSERT INTO staff (name, role, department, phone, email, status) VALUES (?, ?, ?, ?, ?, ?)").run(name, role, department, phone, email, status);
    addLog("Funcionário Registado", `${name} foi adicionado ao departamento de ${department}.`);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/consultations", (req, res) => {
    const consultations = db.prepare(`
      SELECT c.*, p.name as patientName, d.name as doctorName 
      FROM consultations c
      JOIN patients p ON c.patientId = p.id
      JOIN doctors d ON c.doctorId = d.id
    `).all();
    res.json(consultations);
  });

  app.post("/api/consultations", (req, res) => {
    const { patientId, doctorId, date, time, status, observations } = req.body;
    const info = db.prepare("INSERT INTO consultations (patientId, doctorId, date, time, status, observations) VALUES (?, ?, ?, ?, ?, ?)").run(patientId, doctorId, date, time, status, observations);
    addLog("Consulta Agendada", `Nova consulta marcada para o dia ${date} às ${time}.`);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/reports/stats", (req, res) => {
    const patientCount = db.prepare("SELECT count(*) as count FROM patients").get() as { count: number };
    const consultationCount = db.prepare("SELECT count(*) as count FROM consultations").get() as { count: number };
    const doctorCount = db.prepare("SELECT count(*) as count FROM doctors").get() as { count: number };
    const staffCount = db.prepare("SELECT count(*) as count FROM staff").get() as { count: number };
    const lowStockCount = db.prepare("SELECT count(*) as count FROM inventory WHERE quantity <= minQuantity").get() as { count: number };
    const dailyRevenue = db.prepare("SELECT SUM(amount) as total FROM transactions WHERE type = 'Pagamento' AND date >= date('now')").get() as { total: number };
    
    res.json({
      patients: patientCount.count,
      consultations: consultationCount.count,
      doctors: doctorCount.count,
      staff: staffCount.count,
      lowStock: lowStockCount.count,
      revenue: dailyRevenue.total || 0
    });
  });

  app.get("/api/inventory", (req, res) => {
    const items = db.prepare("SELECT * FROM inventory").all();
    res.json(items);
  });

  app.post("/api/inventory", (req, res) => {
    const { name, category, quantity, minQuantity, unit } = req.body;
    const info = db.prepare("INSERT INTO inventory (name, category, quantity, minQuantity, unit) VALUES (?, ?, ?, ?, ?)").run(name, category, quantity, minQuantity, unit);
    addLog("Stock Actualizado", `Item ${name} foi adicionado ao inventário.`);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/treasury", (req, res) => {
    const transactions = db.prepare(`
      SELECT t.*, p.name as patientName 
      FROM transactions t
      LEFT JOIN patients p ON t.patientId = p.id
      ORDER BY t.date DESC
    `).all();
    res.json(transactions);
  });

  app.post("/api/treasury", (req, res) => {
    const { patientId, amount, method, type, description } = req.body;
    const info = db.prepare("INSERT INTO transactions (patientId, amount, method, type, description) VALUES (?, ?, ?, ?, ?)").run(patientId, amount, method, type, description);
    addLog("Transacção Financeira", `${type} de ${amount} AOA via ${method} registado.`);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/tasks", (req, res) => {
    const tasks = db.prepare("SELECT * FROM tasks ORDER BY id DESC").all();
    res.json(tasks);
  });

  app.get("/api/activity-logs", (req, res) => {
    const logs = db.prepare("SELECT * FROM activity_logs ORDER BY id DESC").all();
    res.json(logs);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
