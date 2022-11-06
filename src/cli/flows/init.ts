import { Apostador } from "../../objects/Apostador";
import { messages } from "../messages";
import clearTerminal from "clear";
import { promptForCPF } from "../prompts/cpf";
import { registerApostadorFlow } from "./registerApostador";
import { registeredFlow } from "./registered";

export async function initFlow(): Promise<void> {
  clearTerminal();
  messages.showTitle("Bem-vindo ao sistema de Bolão da Copa do Mundo!");
  const cpf = await promptForCPF(
    "Por gentileza. Digite o seu CPF (somente números) para que eu possa identificá-lo:"
  );
  let apostador = await Apostador.find(cpf);
  if (apostador == null) {
    messages.showWarning("Apostador não encontrado.");
    apostador = await registerApostadorFlow(cpf);
  }
  await registeredFlow(apostador);
  process.exit(0);
}
