import { Command } from "./deps.ts";
import sync from "./sync.ts";

await new Command()
  .name("tools")
  .version("1.0")
  .description("Common tools you need via cli! -Ash Hatz")
  .action((_options, ..._args) => {
    console.log("tools v1.0", "\n");
    console.log("Sync branches");
    console.log("sync {arg}");
    Deno.exit(1);
  })
  .command("sync", "Sync all branches with 'master' branch")
  .arguments("[root:string]")
  .action(async (_options, ...args) => {
    try {
      await sync(args[0]);
      Deno.exit(0);
    } catch (error) {
      console.log(error.message);
      Deno.exit(1);
    }
  })
  .parse(Deno.args);
