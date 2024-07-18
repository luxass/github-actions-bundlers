import process from "node:process";
import * as core from "@actions/core";
async function run() {
    try {
        const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => res.json());
        core.info(`fetched data: ${JSON.stringify(data)}`);
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
        else {
            core.setFailed("An unexpected error occurred");
        }
    }
}
run().catch((err) => {
    console.error(err);
    core.setFailed(err);
    process.exit(1);
});
