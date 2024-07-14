import { readdir, writeFile } from "node:fs/promises";

let baseWorkflowFile = `
name: Hello World

on:
  push:
    branches:
      - main
  pull_request:
    types:
      - opened
      - synchronize

jobs:
`;

async function run() {
  const folders = await readdir("./actions");

  for (const folder of folders) {
    const files = await readdir(`./actions/${folder}`);
    for (const file of files) {
      if (file === "action.yaml") {
        baseWorkflowFile += `
  ${folder}:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v4.1.7

      - name: Hello World (${folder})
        uses: ./actions/${folder}
        `;
      }
    }
  }

  await writeFile("./.github/workflows/hello-world.yaml", baseWorkflowFile);
}

run().catch((err) => {
  console.error(err);
  // eslint-disable-next-line node/prefer-global/process
  process.exit(1);
});
