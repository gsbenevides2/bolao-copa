import { initFlow } from "./cli/flows/init";
import { createTable } from "./database/createTables";

async function main(): Promise<void> {
  await createTable();
  await initFlow();
}

void main();
