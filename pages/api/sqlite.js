import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
  return open({
    filename: '/path/to/your/database.sqlite',
    driver: sqlite3.Database
  });
}

export default async function handler(req, res) {
  const db = await openDb();

  const data = await db.all('SELECT * FROM your_table');
  res.json(data);
}

/*
// SAMPLE usage (in client-side)

// this is read only, so fairly safe from sql-injection type stuff, can make it a read only key.

async function loadData() {
  const response = await fetch('/api/sqlite.js'); // can make routes dynamic, or per .js
  const data = await response.json();
  // Do something with the data
}
// likely in useEffect, in a component

*/