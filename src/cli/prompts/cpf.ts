import inquirer from "inquirer";

export async function promptForCPF(
  message = "Enter your CPF (numbers only):",
  aditionalValidation?: (cpf: string) => string | true
): Promise<string> {
  const { cpf } = await inquirer.prompt({
    name: "cpf",
    message,
    transformer: (cpf) => {
      if (cpf.length >= 11) {
        return cpf
          .slice(0, 11)
          .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      }
      return cpf;
    },
    validate: (cpf: string) => {
      if (cpf.length < 11) {
        return "O CPF deve ter 11 dígitos númericos.";
      } else if (cpf.length > 11) cpf = cpf.slice(0, 11);
      // Validate verification digits
      const cpfArray = cpf.split("");
      const firstDigit = cpfArray[9];
      const secondDigit = cpfArray[10];
      const firstDigitSum = cpfArray
        .slice(0, 9)
        .map((digit, index) => parseInt(digit) * (10 - index))
        .reduce((acc, curr) => acc + curr);
      const firstDigitResult = firstDigitSum % 11;
      const firstDigitExpected =
        firstDigitResult < 2 ? 0 : 11 - firstDigitResult;
      const secondDigitSum = cpfArray
        .slice(0, 10)
        .map((digit, index) => parseInt(digit) * (11 - index))
        .reduce((acc, curr) => acc + curr);
      const secondDigitResult = secondDigitSum % 11;
      const secondDigitExpected =
        secondDigitResult < 2 ? 0 : 11 - secondDigitResult;
      if (
        firstDigitExpected !== parseInt(firstDigit) ||
        secondDigitExpected !== parseInt(secondDigit)
      ) {
        return "CPF inválido.";
      }

      // Validate repeated digits
      const repeatedDigits = cpfArray.every((digit) => digit === cpfArray[0]);
      if (repeatedDigits) {
        return "CPF inválido.";
      }
      return aditionalValidation != null ? aditionalValidation(cpf) : true;
    },
    filter: (cpf) => cpf.replace(/\D/g, "").slice(0, 11),
  });
  return cpf;
}
