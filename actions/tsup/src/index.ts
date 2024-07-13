import { setFailed } from "@actions/core";

async function run() {
  console.log("Hello, world!");
}

run().catch((err) => {
  console.error(err);
  setFailed(err);
  process.exit(1);
});
