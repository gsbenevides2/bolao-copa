import inquirer from "inquirer";

export async function promptForOption(options: string[]): Promise<string> {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Escolha uma opção",
    choices: options,
  });
  return answer.option;
}
