import { Apostador } from "../../objects/Apostador";
import { promptForAnyAndRequiredText } from "../prompts/text";

export async function registerApostadorFlow(cpf: string): Promise<Apostador> {
  const nome = await promptForAnyAndRequiredText(
    "Por gentileza. Para que eu possa te registrar. Qual o seu nome?",
    "O nome é obrigatório"
  );
  return await Apostador.register(nome, cpf);
}
