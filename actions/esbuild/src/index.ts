import process from "node:process";
import * as core from "@actions/core";
import * as github from "@actions/github";

async function findExistingComment(octokit: ReturnType<typeof github.getOctokit>, owner: string, repo: string, issueNumber: number): Promise<number | null> {
  const { data: comments } = await octokit.rest.issues.listComments({
    owner,
    repo,
    issue_number: issueNumber,
  });

  const botComment = comments.find((comment) =>
    comment.user?.type === "Bot" && comment.body?.startsWith("## Automated Pull Request Comment"),
  );

  return botComment ? botComment.id : null;
}

async function createOrUpdateComment(octokit: ReturnType<typeof github.getOctokit>, owner: string, repo: string, issueNumber: number, body: string): Promise<void> {
  const existingCommentId = await findExistingComment(octokit, owner, repo, issueNumber);

  if (existingCommentId) {
    await octokit.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existingCommentId,
      body,
    });
    core.info("Updated existing comment on the pull request.");
  } else {
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body,
    });
    core.info("Created new comment on the pull request.");
  }
}

async function run() {
  try {
    const token = core.getInput("github-token", { required: true });

    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    const fullCommentBody = `## Automated Pull Request Comment`;

    await createOrUpdateComment(octokit, owner, repo, 2, fullCommentBody);

    core.setOutput("comment-updated", "true");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unexpected error occurred");
    }
  }
}

run().catch((err) => {
  console.error(err);
  core.setFailed(err);
  process.exit(1);
});
