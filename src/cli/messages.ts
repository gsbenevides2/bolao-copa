import chalk from "chalk";

export const messages = {
  showTitle(message: string): void {
    console.log(chalk.blue.bold(message));
  },

  showWarning(message: string): void {
    console.log(chalk.yellow.bold("! " + message));
  },

  showGreetings(message: string): void {
    console.log(chalk.magenta.bold(message));
  },
};
