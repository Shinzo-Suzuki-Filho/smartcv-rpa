import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.db = null;
    this.init();
  }

  async init() {
    this.db = await SQLite.openDatabaseAsync('smartcv.db');
    await this.db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS resumes (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        full_name TEXT,
        email TEXT,
        phone TEXT,
        summary TEXT,
        experience TEXT,
        education TEXT,
        skills TEXT,
        template TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized');
  }

  async saveResume(resume) {
    const { title, fullName, email, phone, summary, experience, education, skills, template } = resume;
    const result = await this.db.runAsync(
      'INSERT INTO resumes (title, full_name, email, phone, summary, experience, education, skills, template) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, fullName, email, phone, summary, experience, education, skills, template]
    );
    return result.lastInsertRowId;
  }

  async getResumes() {
    return await this.db.getAllAsync('SELECT * FROM resumes ORDER BY created_at DESC');
  }

  async deleteResume(id) {
    await this.db.runAsync('DELETE FROM resumes WHERE id = ?', [id]);
  }
}

export const dbService = new DatabaseService();
