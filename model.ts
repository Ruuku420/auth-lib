interface DatabaseEntry {
  session?: string;
  password_hash: string;
}

interface Database {
  [username: string]: DatabaseEntry;
}

export const database: Database = {};
