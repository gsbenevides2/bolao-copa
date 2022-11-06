import { ApostadorDao } from "../database/DAOs/ApostadorDao";

export class Apostador {
  private readonly nome: string;
  private readonly cpf: string;

  private constructor(nome: string, cpf: string) {
    this.nome = nome;
    this.cpf = cpf;
  }

  static async register(nome: string, cpf: string): Promise<Apostador> {
    const apostadorDb = await ApostadorDao.create(nome, cpf);
    return new Apostador(apostadorDb.nome, apostadorDb.cpf);
  }

  static async find(cpf: string): Promise<Apostador | undefined> {
    const apostadorDb = await ApostadorDao.find(cpf);
    if (apostadorDb != null) {
      return new Apostador(apostadorDb.nome, apostadorDb.cpf);
    }
    return undefined;
  }

  getNome(): string {
    return this.nome;
  }
}
