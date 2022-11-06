import { Connection } from "../connection";

interface ApostadorDb {
  id: number;
  nome: string;
  cpf: string;
}

export const ApostadorDao = {
  async create(nome: string, cpf: string): Promise<ApostadorDb> {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(`
            INSERT INTO apostador (nome, cpf) 
            VALUES (?, ?)
        `);
    await statement.bind(nome, cpf);
    await statement.run();
    await statement.finalize();
    return (await ApostadorDao.find(cpf)) as ApostadorDb;
  },

  async find(cpf: string): Promise<ApostadorDb | undefined> {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `SELECT * FROM apostador WHERE cpf = ?`
    );
    await statement.bind(cpf);
    const result = await statement.get();
    await statement.finalize();
    return result;
  },
};
