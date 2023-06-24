import { Input, cyan, bold } from "./deps.ts";

type result = { pushed: boolean; synced: boolean };
const decoder = new TextDecoder();

async function set_root(): Promise<string> {
  return await Input.prompt({
    message: `Select source branch to sync branches with`,
  });
}

function checkout(destination: string) {
  const checkout = new Deno.Command("git", {
    args: ["checkout", destination],
  });

  const checkoutOutput = checkout.outputSync();
  if (!checkoutOutput.success) throw Error(`Failed to checkout to ${destination}`);
}

function merge(root: string): boolean {
  const merge = new Deno.Command("git", {
    args: ["merge", root, "--ff"],
  });
  const output = merge.outputSync();

  if (!output.success) {
    const abort = new Deno.Command("git", {
      args: ["merge", "--abort"],
    });
    abort.outputSync();
    return false;
  }
  return true;
}

function get_branches() {
  const branchCommand = new Deno.Command("git", {
    args: ["branch"],
  });

  const branchOutput = branchCommand.outputSync();
  const { stdout } = branchOutput;
  const branches_ascii = [];
  let last_index = 1;
  for (let i = 1; i < stdout.length; i++) {
    const ascii_character = stdout[i];
    if (ascii_character === 10) {
      const buffer = stdout.slice(last_index, i);
      if (buffer[0] === 42) {
        branches_ascii.push(buffer.slice(1, buffer.length));
      } else {
        branches_ascii.push(buffer);
      }
      last_index = i + 1;
    }
  }

  const branches: string[] = [];

  branches_ascii.forEach((branch) => {
    const branch_string = decoder.decode(branch).trim();
    branches.push(branch_string);
  });

  return branches;
}

function push_branch(): boolean {
  const pusher = new Deno.Command("git", {
    args: ["push"],
  });

  const push = pusher.outputSync();
  if (!push.success) {
    return false;
  }
  return true;
}

export default async function sync(source?: string) {
  const repo_dir = Deno.cwd();
  try {
    Deno.chdir(".git");
  } catch (_error) {
    throw new Error("No git repository found");
  }
  Deno.chdir(repo_dir);

  let root = "";
  if (!source) {
    root = await set_root();
  } else {
    root = source;
  }

  const branches = get_branches();

  branches.forEach((branch) => {
    const result: result = { pushed: false, synced: false };
    checkout(branch);
    const merge_status = merge(root);

    if (merge_status) {
      result.synced = true;
      if (push_branch()) result.pushed = true;
    }

    const output_string = `${branch}, synced:${result.synced ? "✅" : "❌"} pushed:${result.pushed ? "✅" : "❌"}`;
    console.log(bold(cyan(output_string)));
  });

  checkout(root);
}
