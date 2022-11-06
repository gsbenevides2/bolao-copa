import inquirer from "inquirer";

export async function promptForAnyAndRequiredText(
  message: string,
  errorMessage: string,
  defaultValue?: string
): Promise<string> {
  const answer = await inquirer.prompt({
    type: "input",
    name: "text",
    message,
    default: defaultValue,
    validate: (text: string) => {
      if (text.length === 0) return errorMessage;
      return true;
    },
  });
  return answer.text;
}
