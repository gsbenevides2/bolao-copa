import { Apostador } from "../../objects/Apostador";
import clearTerminal from "clear";
import { messages } from "../messages";
import { promptForOption } from "../prompts/option";
import { clear } from "console";

export async function registeredFlow(apostador: Apostador): Promise<void> {
  clearTerminal();
  messages.showTitle("Olá " + apostador.getNome().split(" ")[0] + "!");
  const option = await promptForOption([
    "Criar Bolão",
    "Apostar",
    "Ver apostas",
    "Sair",
  ]);
  /*
  switch (option) {
  } */
  if (option !== "Sair") {
    await registeredFlow(apostador);
  } else {
    clear();
    messages.showGreetings(
      "Obrigado por utilizar o sistema de Bolão da Copa do Mundo, Volte sempre!"
    );
    process.exit(0);
  }
}
