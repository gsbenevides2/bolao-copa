import { Connection } from "./connection";

export async function createTable(): Promise<void> {
  const connection = await Connection.getInstance();
  const statement = await connection.prepare(
    `CREATE TABLE IF NOT EXISTS apostador (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT NOT NULL, 
        cpf TEXT NOT NULL UNIQUE
    )`
  );
  await statement.run();
}
